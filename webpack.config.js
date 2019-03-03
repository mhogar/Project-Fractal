const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	entry: './src/app.js',
	output: {
		filename: 'main.js'
	},
	devtool: 'inline-source-map',
	devServer: {
    	contentBase: './dist'
  	},
  	module: {
  		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
		        test: /\.css$/,
		        use: [
	          		'vue-style-loader',
		          	'css-loader'
		        ]
		    }
	    ]
  	},
	plugins: [
		new VueLoaderPlugin()
	]
};