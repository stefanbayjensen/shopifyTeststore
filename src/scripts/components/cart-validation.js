import { component } from 'picoapp'

export default component( node => {
    const submit = node.querySelectorAll('.js-submit')
    const terms = node.querySelector('.js-terms')
    const popup = document.querySelector('.js-popup')
    const accept = popup.querySelector('.js-accept')
    const cancel = popup.querySelector('.js-cancel')

    submit.forEach( btn => {
        btn.addEventListener('click', e => {
            if( !terms.checked ){
                e.preventDefault()
                popup.classList.add('open')
            }
        })
    })

    accept.addEventListener( 'click', () => {
        terms.checked = true
        submit[0].click()
    })

    cancel.addEventListener( 'click', () => {
        popup.classList.remove('open')
    })

})