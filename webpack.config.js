const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "./lazy-loading.js"
    },
    mode: "production",
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].css",
                            context: "./",
                            outputPath: "./",
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false
        })
    ]
};
