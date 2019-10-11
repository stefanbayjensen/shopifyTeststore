import { component } from 'picoapp'

let output = ''
let outputHTML = ''
let collectionHandle = ''
let loader = `
    <div class="loader js-loader">
        <i class="loader__item"></i>
        <i class="loader__item"></i>
        <i class="loader__item"></i>
    </div>
`

let error = `
    <h2 class="collection__title">Vi kunne desværre ikke finde nogle produkter..</h2>
`

let colorTags = []
let categoryTags = []
let activeVendors = []

export default component(node => {
    const colors = node.querySelectorAll('.js-color')
    const categories = node.querySelectorAll('.js-category')
    const vendors = node.querySelectorAll('.js-vendor')

    output = node.querySelector('.js-products')
    collectionHandle = node.getAttribute('data-collection')

    outputHTML = output.innerHTML

    if (colors) {
        colors.forEach(color => {
            color.addEventListener('click', e => {
                colorTags = []

                color.classList.toggle('active')
                colors.forEach(c => {
                    if(c.classList.contains('active')){
                        colorTags.push(c.getAttribute('data-color'))
                    }
                })

                fetchProducts()
            })
        })
    }

    if(categories){
        categories.forEach(category => {
            category.addEventListener('click', e => {
                categoryTags = []

                category.classList.toggle('active')

                categories.forEach( c => {
                    if(c.classList.contains('active')){
                        categoryTags.push(c.getAttribute('data-category'))
                    }
                })

                fetchProducts()
            })
        })
    }

    if( vendors ){
        vendors.forEach(vendor => {
            vendor.addEventListener('click', e => {
                activeVendors = []

                vendor.classList.toggle('active')

                vendors.forEach(v => {
                    if( v.classList.contains('active') ){
                        activeVendors.push(v.getAttribute('data-vendor'))
                    }
                })

                fetchProducts()
            })
        })
    }
})

function renderProducts(array){
    let products = []
    let render = false

    const fetchIt = handle => {
        return fetch(`/products/${handle}?view=item`)
            .then( r => r.text())
            .then( data => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(data, "text/html")

                products.push(doc.querySelector('main').innerHTML)
            })
    }

    for(let i = 0; i < array.length; i++){
        fetchIt(array[i]).then(r => {
            if( products.length == array.length ){
                output.innerHTML = ''
                products.forEach(product => {
                    output.innerHTML = output.innerHTML + product
                })
            }
        })
    }

    if(array.length == 0){
        output.innerHTML = error
    }
}

function fetchProducts(){
    if( colorTags.length > 0 || categoryTags.length > 0 || activeVendors.length > 0 ){
        fetch(`${collectionHandle}/products.json`)
        .then(r => r.json())
        .then(data => {
            const products = data.products
            let categoryMatches = []
            let colorMatches = []
            let filteredProducts = []
            let vendorMatches = []

            products.forEach( product => {

                console.log(product)

                product.tags.forEach(tag => {
                    if (colorTags.includes(tag)) {
                        colorMatches.push(product.handle)
                    } else if(categoryTags.includes(tag)){
                        categoryMatches.push(product.handle)
                    }
                })

                if (activeVendors.includes(product.vendor)) {
                    vendorMatches.push(product.handle)
                }
            })

            if (colorMatches.length > 0 && categoryMatches.length > 0) {
                filteredProducts = colorMatches.filter(element => categoryMatches.includes(element))
            } else if( colorMatches.length > 0 ){
                filteredProducts = colorMatches
            } else if( categoryMatches.length > 0 ){
                filteredProducts = categoryMatches
            }

            if( vendorMatches.length > 0 && filteredProducts.length > 0 ){
                filteredProducts = vendorMatches.filter(element => filteredProducts.includes(element))
            } else if( vendorMatches.length > 0 ){
                filteredProducts = vendorMatches
            }
            
            filteredProducts = filteredProducts.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item],[])

            output.innerHTML = loader
            renderProducts(filteredProducts)
        })
    } else {
        output.innerHTML = outputHTML
    }
}

function toggleFilter(tag, dataTag, searchTags, output, collection){
    tag.addEventListener('click', e => {
        tag.classList.toggle('active')
        if( tag.classList.contains('active') ){
            searchTags.push(tag.getAttribute(dataTag))
        } else {
            searchTags = searchTags.filter( item => {
                return item != tag.getAttribute(dataTag) 
            })
            void searchTags.length
        }
        fetchProducts(searchTags, output, collection)
    })
}

Array.prototype.diff = function(arr2) {
    let ret = []
    this.sort()
    arr2.sort()
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i])
        }
    }
    return ret
}