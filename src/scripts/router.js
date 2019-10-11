import operator from 'operator' 
import "es6-string-polyfills"
import app from '@/app.js'

require('es6-object-assign').polyfill()

/**
 * operator is a tiny "PJAX" library, please have a look at the docs for
 * more info
 *
 * @see https://github.com/estrattonbailey/operator
 */
const router = operator('#root', [{
    'path': '/cart/change',
    ignore: true
  },
  () => new Promise(res => {
    document.body.classList.remove('is-visible')
    document.body.classList.add('is-transitioning')
    setTimeout(res, 500)
    setTimeout(() => {
      document.body.classList.remove('is-transitioning')
    }, 600)
  })
])

router.on('after', ({ title, pathname }) => {
  document.title = title
  window.history.pushState({}, '', pathname)
})

export default router