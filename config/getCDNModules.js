
const cdnEnv = process.env.NODE_ENV === 'development' ? 'development' : 'production.min';
const paths = require('./paths');
const appPackage = require(paths.appPackageJson);

function getCDNModules() {
    const moduleFromPackage = appPackage.cdnModules || [];
    const ignoresCdnPackage = appPackage.ignoresCdnPackage || [];

    if (moduleFromPackage.length) {

        // [{name: 'react', path: 'react.min.js'}];

        return moduleFromPackage.map(module => ({
            ...module,
            _var: module._var || module.name,
        }));
    } else {

        // 返回默认的cdn模块
        return [
            { name: 'react', _var: 'React', path: `umd/react.${cdnEnv}.js` },
            { name: 'react-dom', _var: 'ReactDOM', path: `umd/react-dom.${cdnEnv}.js` },
            { name: 'ahooks', _var: 'ahooks', path: `https://require.mp.sztv.com.cn/cdn/ahooks.js` },
            { name: '@remix-run/router', _var: '@remix-run/router', path: `https://require.mp.sztv.com.cn/cdn/router.umd.min.js` },
            { name: 'react-router', _var: 'ReactRouter', path: `react-router.${cdnEnv}.js` },
            { name: 'react-router-dom', _var: 'ReactRouterDOM', path: `react-router-dom.${cdnEnv}.js` },
            { name: 'mobx', _var: 'mobx', path: `mobx.umd.${cdnEnv}.js` },
            { name: 'mobx-react-lite', _var: 'mobxReactLite', path: `mobxreactlite.umd.${cdnEnv}.js` },
            { name: 'axios', _var: 'axios', path: `axios.js` },
            { name: 'lodash', _var: '_', path: `https://cdn.staticfile.org/lodash.js/4.17.21/lodash.min.js` },
            { name: 'mockjs', _var: 'Mock', path: `https://cdn.staticfile.org/Mock.js/1.0.0/mock-min.js`, env: "development" },
        ].filter(i => !ignoresCdnPackage.includes(i.name)).filter(i => !i.env || i.env === process.env.NODE_ENV);
    }
}

module.exports = getCDNModules;
