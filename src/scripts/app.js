import { picoapp } from 'picoapp'

import header from '@/components/header.js'
import productSelection from '@/components/product-selection.js'
import miniCart from '@/components/miniCart.js'
import miniCartItem from '@/components/miniCartItem.js'
import accountLogin from '@/components/accountLogin.js'
import product from '@/components/product.js'
import productCounter from '@/components/product-counter.js'
import cartValidation from '@/components/cart-validation.js'
import productSlider from '@/components/product-slider.js'
import collection from '@/components/collection.js'
import recentlyViewed from '@/components/recently-viewed.js'
import productPageSlider from '@/components/product-page-slider.js'
import productCountdown from '@/components/product-countdown.js'
import cartDrawer from '@/components/cartDrawer.js'
import cartDrawerItem from '@/components/cartDrawerItem.js'

const state = {
    cartOpen: false,
}

const components = {
    accountLogin,
    header,
    productSelection,
    miniCart,
    product,
    productCounter,
    miniCartItem,
    cartValidation,
    productSlider,
    collection,
    recentlyViewed,
    productPageSlider,
    productCountdown,
    cartDrawer,
    cartDrawerItem
}

export default picoapp(components, state)
