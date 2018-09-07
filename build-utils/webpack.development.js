const path = require('path');
const webpack = require('webpack');

module.exports = ({ mode }) => ({
	mode,
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		path: path.resolve(__dirname, 'build'),
		port: 4000,
		hot: true,
		historyApiFallback: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
