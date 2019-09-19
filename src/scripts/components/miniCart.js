import { component } from 'picoapp'
import { getSizedImageUrl, imageSize } from '@/lib/images.js'
import { formatMoney } from '@/lib/currency.js'
import app from '@/app.js'

/* eslint-disable-next-line max-len */
const X = `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentcolor" stroke-width="3" style="display:inline-block;vertical-align:middle;overflow:visible;"><path d="M1.0606601717798212 1.0606601717798212 L14.939339828220179 14.939339828220179"></path><path d="M14.939339828220179 1.0606601717798212 L1.0606601717798212 14.939339828220179"></path></svg>`

let miniCartClass = 'mini-cart'

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
              '200x' // TODO hacky af
          )
        : 'https://source.unsplash.com/R9OS29xJb-8/2000x1333'

    return `
    <li class="${miniCartClass}__item" data-component="miniCartItem" data-id="${id}">
        <figure class="${miniCartClass}__img"><img src="${img}" /></figure>
        <p class="${miniCartClass}title"><span class="quantity js-item-quantity">${quantity}x</span> ${title}</p>
        <div class="${miniCartClass}price">
            <p class="price">${formatMoney(price)}</p>
        </div>
        <a href="#" aria-label="${theme.strings.cartItemRemove} ${title}" class="${miniCartClass}__remove js-item-remove">${theme.strings.cartItemRemove}</a>
        <a href="${url}" class="${miniCartClass}__link"></a>
    </li>
  `
}

function cartEmpty(node, items) {
    const empty = node.querySelector('.js-empty')
    const list = node.querySelector('.js-list')

    if( items.length == 0 ){
        empty.style.display = 'block'
        list.style.display = 'none'
    } else {
        empty.style.display = 'none'
        list.style.display = 'block'
    }
}

function renderItems(items, node) {

    console.log(node)
    return items.length > 0
        ? items.reduce((markup, item) => {
            cartEmpty(node, items)
            markup += createItem(item)
            return markup
          }, '')
        : cartEmpty(node, items)
}

export default component((node, ctx) => {
    const subtotal = node.querySelector('.js-total')
    const itemsRoot = node.querySelector('.js-items')
    const loading = itemsRoot.innerHTML
    miniCartClass = node.classList[0]

    const render = (cart) => {
        itemsRoot.innerHTML = renderItems(cart.items, node)
        subtotal.innerHTML = formatMoney(cart.total_price)
    }

    render(ctx.getState().cart)

    ctx.on('cart:updated', () => {
        render(ctx.getState().cart)

        app.mount()

        node.classList.add(`${miniCartClass}--open`)
        setTimeout(() => {
          node.classList.remove(`${miniCartClass}--open`)
        }, 4000)
    })
})
