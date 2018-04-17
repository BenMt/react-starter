import webpackConfig from './webpack.config.babel'
import bundleAnalyzer from 'webpack-bundle-analyzer'

let bundleConfig = webpackConfig
bundleConfig.plugins.push(new bundleAnalyzer.BundleAnalyzerPlugin())

export default bundleConfig
