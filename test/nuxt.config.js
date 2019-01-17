module.exports = {
    mode: 'spa',
    head: {
        title: '测试程序',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    loading: { color: '#fff' },
    plugins: ['@/plugins/search.js'],
    srcDir: 'test',
    buildDir: 'test/.nuxt',
    modules: [
        '@nuxtjs/axios'
    ]
}