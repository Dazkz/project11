module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
        require('postcss-inline-svg')({
            removeFill: true
        })
    ]   
}