const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolve = dir => path.resolve(__dirname, dir);
// const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
module.exports={
    // plugins: [
    //     {
    //         plugin: require('craco-babel-loader'),
    //         options: {
    //             includes: [
    //                 resolveApp('../../packages/shared'),
    //                 resolveApp('../../packages/core'),
    //                 resolveApp('../../packages/react'),
    //                 resolveApp('../../packages/react-settings-form'),
    //                 resolveApp('../../formily/antd'),
    //                 resolveApp('../../formily/setters'),
    //             ],
    //         },
    //     },
    // ],
    webpack: {
        alias: {
            "@alkaid/shared": resolve("shared/alkaid/shared"),
            "@alkaid/core": resolve("shared/alkaid/core"),
            "@alkaid/react": resolve("shared/alkaid/react"),
            "@alkaid/react-settings-form": resolve("shared/alkaid/react-settings-form"),
            "@alkaid/formily-antd": resolve("shared/alkaid/antd"),
            "@alkaid/formily-setters": resolve("shared/alkaid/setters"),
        },
    },

}