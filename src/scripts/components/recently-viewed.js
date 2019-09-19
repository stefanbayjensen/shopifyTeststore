import { component } from 'picoapp'

export default component(node => {
    let cookies = document.cookie.split('; ')
    
    const output = node.querySelector('.js-output')
    const currentProduct = node.getAttribute('data-product')
    
    setTimeout(() => {
        if( document.cookie.includes('_shopify_rw') ){
            cookies.forEach(cookie => {
                if( cookie.includes('_shopify_rw') ){
                    let values = cookie.split('=')
                    let products = values[1].split('|')
                    let renderThis = []
        
                    let index = products.indexOf(currentProduct)
                    if(index !== -1) products.splice(index , 1)
        
                    products.slice(0,5)
                    
                    if( products.length > 0 ){
                        for(let i = 0; i < products.length; i++){
                            fetch(`/products/${products[i]}?view=item`)
                                .then( r => r.text())
                                .then( data => {
                                    const parser = new DOMParser()
                                    const doc = parser.parseFromString(data, "text/html")
            
                                    let object = {
                                        handle: products[i],
                                        html: doc.querySelector('main').innerHTML
                                    }
            
                                    renderThis.push(object)
                                })
                                .then(r => {
                                    if( products.length == renderThis.length ){
                                        let orderedArray = mapOrder(renderThis, products, 'handle');
                                        output.innerHTML = ''
            
                                        for(let i = 0; i < orderedArray.length; i++){
                                            if( i == 4 ){
                                                break;
                                            } else {
                                                output.innerHTML = output.innerHTML + orderedArray[i].html
                                          }
                                        }
                                    }
                                })
                        }
                    } else {
                        node.parentNode.removeChild(node)
                    }
                }
            })
        } else {
            node.parentNode.removeChild(node)
        }
    }, 100);
})

function mapOrder (array, order, key) {
  
    array.sort( function (a, b) {
      var A = a[key], B = b[key]
      
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1
      } else {
        return -1
      }
    })
    
    return array
  }