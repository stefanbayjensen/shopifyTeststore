import fetch from 'unfetch'
import app from '@/app.js'
import { cartError, cartSuccess } from '@/lib/cartResponse.js'

export function addVariant(variant, quantity) {
            
    return fetchCart().then(({ items }) => {
        return addItemById(variant.id, quantity)
    })
}

export function updateAddon(id, quantity) {
    return fetchCart().then(({ items }) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].variant_id === parseInt(id)) {
                return changeAddon(i + 1, quantity) // shopify cart is a 1-based index
            }
        }
    })
}

export function removeAddon(id) {
    return updateAddon(id, 0)
}

function changeAddon(line, quantity) {
    app.emit('cart:updating')

    return fetch('/cart/change.js', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ line, quantity }),
    })
        .then((res) => res.json())
        .then((cart) => {
            app.hydrate({ cart: cart })
            app.emit('cart:updated', { cart: cart })
            return cart
        })
}

export function addItemById(id, quantity) {
    app.emit('cart:updating')

    return fetch('/cart/add.js', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ id, quantity }),
    })
        .then((r) => r.json())
        .then((item) => {
            if( item.status ){
                cartError( item.description )
            } else {
                return fetchCart().then((cart) => {
                    app.hydrate({ cart: cart })
                    app.emit('cart:updated')
                    app.emit('updated', { item, cart })
                    return { item, cart }
                })
            }
        })
}

export function fetchCart() {
    return fetch('/cart.js', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
    }).then((res) => res.json())
}