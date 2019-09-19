const path = require('path')

module.exports = {
    assets: {
        presets: ['sass'],
    },
    themes: {
        development: {
            id: '40773779522',
            password: '3d3cf1580f5357942dff3eab39f8229f',
            store: 'stefan-bay-test-store.myshopify.com',
            ignore: [
                'settings_data.json', // leave this here to avoid overriding theme settings on sync
            ],
        },
        live: {
            id: '40773877826',
            password: '3d3cf1580f5357942dff3eab39f8229f',
            store: 'stefan-bay-test-store.myshopify.com',
            ignore: [
                'settings_data.json', // leave this here to avoid overriding theme settings on sync
            ],
        },
    },
}
