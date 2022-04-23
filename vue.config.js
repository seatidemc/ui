const path = require('path');
module.exports = {
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [path.resolve(__dirname, './src/*.less')]
		}
	},

	productionSourceMap: false,

	transpileDependencies: ['vuetify'],
	devServer: {
		proxy: 'http://127.0.0.1:5000',
		host: 'localhost'
	}
};
