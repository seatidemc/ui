const path = require('path');
module.exports = {
    pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [path.resolve(__dirname, './src/*.less')]
		}
	},

    productionSourceMap: false,

    transpileDependencies: [
      'vuetify'
    ]
};
