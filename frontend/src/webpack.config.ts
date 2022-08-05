import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';


const config: webpack.Configuration = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { 
                            presets: ['@babel/preset-env', '@babel/react']
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    devtool: "inline-source-map",
    devServer: {
        open: true,
        port: 3000
    },
    target: 'web',
};

export default config;