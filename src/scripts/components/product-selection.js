import { component } from 'picoapp'
import options from '@/lib/options.js'
import getProductJson from '@/lib/getProductJson.js'
import updatePrices from '@/lib/updatePrices.js'

export default component(({ node }) => {
    const opts = options(node)
          
    // cache
    getProductJson()

    opts.onUpdate((state) => {
        getProductJson().then((json) => {
            const variant = json.variants.filter((v) => v.id == state.id)[0]
            const pathname = `${window.location.pathname}?variant=${variant.id}`

            window.history.pushState({}, '', pathname)

            updatePrices(variant)
        })
    })
})
