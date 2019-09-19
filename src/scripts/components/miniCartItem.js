import { component } from 'picoapp'
import { removeAddon, changeAddon } from '@/lib/cart.js'

export default component((node) => {
    const button = node.querySelector('.js-item-remove')
    const id = node.getAttribute('data-id')

    button.addEventListener('click', event => {
        event.preventDefault()
        removeAddon(id)
    })
})
