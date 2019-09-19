import { component } from 'picoapp'
import { tns } from 'tiny-slider/src/tiny-slider'

export default component(node => {
    const nextBtn = node.querySelector('.js-next')
    const prevBtn = node.querySelector('.js-prev')
    const sliderContainer = node.querySelector('.js-slider')

    const slider = tns({
        container: sliderContainer,
        items: 4,
        //controls: false,
        nav: false,
        gutter: 20,
        loop: false,
        nextButton: nextBtn,
        prevButton: prevBtn
    })
})