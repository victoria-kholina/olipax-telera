// postcss.config.js

module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['>1%', 'last 3 versions'],
            grid: 'autoplace'
        }),



        require('cssnano')({
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        })
    ]
};