module.exports = {
	mode: 'development',
	entry: './src/app.js',
	output: {
		filename: 'main.js'
	},
	devtool: 'inline-source-map',
	devServer: {
    	contentBase: './dist'
  	}
};