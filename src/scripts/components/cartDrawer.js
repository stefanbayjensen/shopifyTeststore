import { component } from 'picoapp'
import { getSizedImageUrl, imageSize } from '@/lib/images.js'
import { formatMoney } from '@/lib/currency.js'
import app from '@/app.js'

/* eslint-disable-next-line max-len */
const X = `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentcolor" stroke-width="3" style="display:inline-block;vertical-align:middle;overflow:visible;"><path d="M1.0606601717798212 1.0606601717798212 L14.939339828220179 14.939339828220179"></path><path d="M14.939339828220179 1.0606601717798212 L1.0606601717798212 14.939339828220179"></path></svg>`

function createItem({
    variant_id: id,
    product_title: title,
    line_price: price,
    variant_title: color,
    image,
    url,
    quantity,
    ...item // eslint-disable-line
}) {
    const img = image
        ? getSizedImageUrl(
              image.replace('.' + imageSize(image), ''),
              '180x180' // TODO hacky af
          )
        : 'https://source.unsplash.com/R9OS29xJb-8/2000x1333'

    return `
<li class="cart-drawer__item" data-id="${id}" data-component="cartDrawerItem">
    <img src="${img}" alt="${title}" class="cart-drawer__item__img">
    <article class="cart-drawer__item__inner">
        <p class="cart-drawer__item__title">${title}</p>
        <p class="cart-drawer__item__price">${formatMoney(price)}</p>
        <div class="cart-drawer__item__quantity">
            <div class="quantity js-remove-single">-</div>
            <div class="quantity js-single-quantity">${quantity}</div>
            <div class="quantity js-add-single">+</div>
        </div>
        <button class="cart-drawer__item__remove js-remove-item">Fjern vare</button>
    </article>
    <a href="${url}" class="cart-drawer__item__link"></a>
</li>
`
}

function renderItems(items) {
    return items.length > 0
        ? items.reduce((markup, item) => {
              markup += createItem(item)
              return markup
          }, '')
        : `<div class='pv1'><p class='pv1 mv05 sans small cm i ac'>Your cart is empty</p></div>`
}

export default component((node, ctx) => {
    const overlay = node.querySelector('.js-overlay')
    const closeButton = node.querySelector('.js-close')
    const subtotal = node.querySelector('.js-subtotal')
    const total = node.querySelector('.js-total')
    const itemsRoot = node.querySelector('.js-items')
    const loading = itemsRoot.innerHTML
    const drawer = node.querySelector('.js-drawer')
    const terms = node.querySelector('#js-terms')

    const render = (cart) => {
        itemsRoot.innerHTML = renderItems(cart.items)
        subtotal.innerHTML = formatMoney(cart.total_price)
        total.innerHTML = formatMoney(cart.total_price)
    }

    const open = (cart) => {
        node.classList.add('is-active')
        itemsRoot.innerHTML = loading
        setTimeout(() => {
            node.classList.add('is-visible')
            document.body.classList.add('is-visible')
            setTimeout(render(cart), 10)
            app.mount()
        }, 50)
    }

    const close = () => {
        node.classList.remove('is-visible')
        document.body.classList.remove('is-visible')
        setTimeout(() => {
            node.classList.remove('is-active')
            app.hydrate({ cartOpen: false })
        }, 400)
    }

    render(ctx.getState().cart)

    overlay.addEventListener('click', close)
    closeButton.addEventListener('click', close)

    ctx.on('cart:toggle', ({ cart, cartOpen }) => {
        if (cartOpen) open(cart)
    })
    ctx.on('cart:updated', () => {
        render(ctx.getState().cart)
        ctx.emit('cart:toggle', (state) => {
            return {
                cartOpen: !state.cartOpen,
            }
        })
        app.mount()
    })

    drawer.addEventListener('submit', e => {
        if( !terms.checked ){
            e.preventDefault()
            popup.classList.toggle('open')
        }        
    })
})