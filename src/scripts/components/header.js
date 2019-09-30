import { component } from 'picoapp'

export default component((node, ctx) => {
    const cartCount = node.querySelector('.js-cart-count')
    const headerHeight = node.offsetHeight
    const body = document.querySelector('body')
    const cartIcon = node.querySelector('.js-cart')

    let offset = 0
    let lastOffset = 0

    const fixedHeader = e => {
        offset  = window.pageYOffset
        
        if( offset >= headerHeight ){
            node.classList.add('site-header--fixed')
        } else {
            node.classList.remove('site-header--fixed')
        }
    }

    fixedHeader()

    body.style.paddingTop = `${headerHeight}px`

    document.addEventListener('scroll', e => {
        fixedHeader()
    })

    ctx.on('cart:updated', (state) => {
        cartCount.innerHTML = state.cart.item_count
        if( state.cart.item_count > 0 ){
            cartIcon.classList.add('site-header__cart--active')
        } else {
            cartIcon.classList.remove('site-header__cart--active')
        }
    })

    cartCount.innerHTML = ctx.getState().cart.item_count


    cartIcon.addEventListener('click', e => {
        e.preventDefault()
        ctx.emit('cart:toggle', (state) => {
            return {
                cartOpen: !state.cartOpen,
            }
        })
    })
})
