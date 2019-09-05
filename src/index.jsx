import { h, render } from 'preact'
import store from './store'
import App from './components/App'

render(<App store={store} />, document.body)
