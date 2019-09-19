import { component } from 'picoapp'
import { tns } from 'tiny-slider/src/tiny-slider'

export default component(node => {
    const slider = node.querySelector('.js-slider')
    const thumbs = node.querySelectorAll('.js-thumb')

    let tiny = tns({
        container: slider,
        items: 1,
        controls: false,
        nav: false,
        mouseDrag: true,
        arrowKeys: true
    })

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', e => {
            let index = thumb.getAttribute('data-index')
            tiny.goTo(index)
        })
    })
})