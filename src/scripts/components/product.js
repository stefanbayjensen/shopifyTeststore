import { component } from 'picoapp'
import { addVariant } from '@/lib/cart.js'

export default component((node, ctx) => {
    const json = JSON.parse(node.querySelector('.js-product-json').innerHTML)
    const form = node.querySelector('form')

    const { selectedOrFirstAvailableVariant, product } = JSON.parse(
        document.querySelector('.js-product-json').innerHTML
    )
    let currentVariant = product.variants.filter((v) => v.id === selectedOrFirstAvailableVariant)[0]

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const button = form.querySelector('*[type="submit"]')

        button.classList.add('disabled')
        button.innerHTML = theme.strings.addingToCart
        currentVariant = product.variants.filter((v) => v.id === parseInt(form.elements.id.value))[0]

        addVariant(currentVariant, form.elements.quantity.value)
        setTimeout( () => {
            button.classList.remove('disabled')
            button.innerHTML = theme.strings.addToCart
        }, 500 )
    })

    let cookies = document.cookie.split('; ')

    let d = new Date();
    d.setMonth(d.getMonth() + 3);

    if(document.cookie.includes('_shopify_rw')){
        cookies.forEach(cookie => {
            if( cookie.includes('_shopify_rw') ){
                let cook = cookie.split('=')
                let values = cook[1].split('|')

                let index = values.indexOf(product.handle)
                if(index !== -1) values.splice(index , 1)

                if(values.length > 5){
                    values.pop()
                }

                let newValues = values.join('|')

                if( newValues[0] != product.handle && newValues.length > 0 ){
                    document.cookie = `_shopify_rw=${product.handle}|${newValues}; path=/; expires=${d};`
                } else {
                    // Do nothing
                }
                
            }
        })
    } else {
        document.cookie = `_shopify_rw=${product.handle}; path=/; expires=${d};`
    }


    const sidebar = node.querySelector('.js-sidebar')
    const sidebarOutput = sidebar.querySelector('.js-output')
    const recommended = node.querySelector('.js-recommended')
    const recommendedOutput = recommended.querySelector('.js-output')

    let sidebarArray = []
    let recommendedArray = []

    fetch(`/recommendations/products.json?product_id=${product.id}&limit=6`)
        .then(r => r.json())
        .then( data => {
            const products = data.products

            for(let i = 0; i < products.length; i++){
                if(i < 2){
                    sidebarArray.push(products[i].handle)
                } else {
                    recommendedArray.push(products[i].handle)
                }
            }
        })
        .then( r => {
            sidebarOutput.innerHTML = ''
            for(let i = 0; i < sidebarArray.length; i++){
                fetch(`/products/${sidebarArray[i]}?view=simple`)
                    .then( r => r.text())
                    .then( data => {
                        const parser = new DOMParser()
                        const doc = parser.parseFromString(data, "text/html")
                        sidebarOutput.innerHTML = sidebarOutput.innerHTML + doc.querySelector('main').innerHTML
                    })
            }

            recommendedOutput.innerHTML = ''
            for(let i = 0; i < recommendedArray.length; i++){
                fetch(`/products/${recommendedArray[i]}?view=item`)
                    .then( r => r.text())
                    .then( data => {
                        const parser = new DOMParser()
                        const doc = parser.parseFromString(data, "text/html")
                        recommendedOutput.innerHTML = recommendedOutput.innerHTML + doc.querySelector('main').innerHTML
                    })
            }
        })
})