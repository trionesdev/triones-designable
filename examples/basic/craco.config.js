const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
module.exports={
    plugins: [
        {
            plugin: require('craco-babel-loader'),
            options: {
                includes: [resolveApp('../../packages/designer')],
            },
        },
    ],
    webpack: {
        watchOptions:{
            ignored:[/node_modules\/sd/]
        },
        configure: (webpackConfig, { env, paths }) => {
            return webpackConfig;
        },
    },
}