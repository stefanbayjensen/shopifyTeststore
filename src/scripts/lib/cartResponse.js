export function cartError(err){
    alert(err)
}

export function cartSuccess(succ){
    alert(succ.product_title + ' ' + theme.strings.cartAddSuccess)
}
