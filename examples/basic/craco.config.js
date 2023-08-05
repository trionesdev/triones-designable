const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
module.exports={
    plugins: [
        {
            plugin: require('craco-babel-loader'),
            options: {
                includes: [
                    resolveApp('../../packages/shared'),
                    resolveApp('../../packages/core'),
                    resolveApp('../../packages/react'),
                    resolveApp('../../packages/react-settings-form'),
                    resolveApp('../../formily/antd'),
                    resolveApp('../../formily/setters'),
                ],
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