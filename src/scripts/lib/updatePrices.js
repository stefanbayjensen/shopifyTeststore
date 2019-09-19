import {formatMoney} from '@/lib/currency.js'

export default function(variant){
    const productPrice = document.querySelector('*[data-price]'),
          productCompareAtPrice = document.querySelector('*[data-compare-price]')

    productPrice.innerHTML = formatMoney(variant.price, theme.moneyFormat)
    
    if( variant.compare_at_price == null ){
      productCompareAtPrice.innerHTML = ''
    } else {
        productCompareAtPrice.innerHTML = formatMoney(variant.compare_at_price)
    }
}