import { h } from 'preact'
import { Provider } from 'react-redux'
import { Router } from 'preact-router'
import Jobs from './jobs/index'

function App({ store }) {
    function handleRoute(e) {
        console.log(e.url)
    }

    return (
        <Provider store={store}>
            <Router onChange={handleRoute}>
                <Jobs default />
            </Router>
        </Provider>
    )
}

export default App
