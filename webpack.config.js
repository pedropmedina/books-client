const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}`)(env);

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) =>
	merge(
		{
			entry: ['./src/index'],
			output: {
				filename: 'bundle.js',
				path: path.resolve(__dirname, 'build'),
				publicPath: '/',
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						use: {
							loader: 'babel-loader',
							options: { presets: ['@babel/preset-env'] },
						},
						include: path.resolve(__dirname, 'src'),
					},
				],
			},
			plugins: [
				new webpack.ProgressPlugin(),
				new CleanPlugin(['build']),
				new HTMLPlugin({
					template: path.resolve(__dirname, 'public/index.html'),
					filename: 'index.html',
				}),
			],
		},
		modeConfig({ mode, presets }),
	);
