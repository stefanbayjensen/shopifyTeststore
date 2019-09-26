import { component } from 'picoapp'
import { countdown } from '@/lib/countdown.js'

export default component( node => {
    const countdownObject = node.querySelector('.js-countdown')
    const time = countdownObject.getAttribute('data-time').split(':')
    let hour = time[0]
    let minutes = time[1]

    let today = new Date()
    today.setHours(hour)
    today.setMinutes(minutes)

    countdown(today, countdownObject)
})