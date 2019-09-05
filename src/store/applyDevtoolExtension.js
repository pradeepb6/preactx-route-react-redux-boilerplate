export default function applyDevtoolExtension() {
    /* eslint-disable no-underscore-dangle */
    const browserExtensionIsInstalled = window.__REDUX_DEVTOOLS_EXTENSION__
    return browserExtensionIsInstalled ? window.__REDUX_DEVTOOLS_EXTENSION__() : store => store
    /* eslint-enable */
}
