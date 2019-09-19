import '../styles/main.scss'
import '@/lib/select.js'
import app from '@/app.js'
import { fetchCart } from '@/lib/cart.js'
import router from '@/router.js'

import cssVars from 'css-vars-ponyfill'
import 'lazysizes'
import 'lazysizes/plugins/rias/ls.rias'
import objectFitImages from 'object-fit-images'

objectFitImages()
cssVars()

router.on('after', ({ title, pathname }) => {
    app.unmount()
    app.mount()
    app.mount()
})

/**
 * load any data that your site needs on fist load
 */
Promise.all([fetchCart()]).then(([cart]) => {
    /**
     * add the cart data to the picoapp instance
     */
    app.hydrate({ cart })

    /**
     * mount any components defined on the page
     */
    app.mount()
    app.mount()
})
