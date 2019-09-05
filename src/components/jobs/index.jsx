import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { setLanguage } from '../../store/actions'

// import { route } from 'preact-router'

class Jobs extends Component {
    componentDidMount() {
        // const routeQueryParameters = this.props.matches
        // const queryParameters = location.search
        let languageAndPage = {
            lang: 'en',
        }
        const { url } = this.props
        const pathName = url.split('/')

        if (pathName.length === 4) {
            const [, lang, pageName] = pathName
            languageAndPage = {
                lang,
                pageName,
            }
            // store.commit('setUrlLanguage', "/" + pathName[1] + "/");
            // store.commit('setUrl', pathName[2]);
        } else {
            const [, pageName] = pathName
            languageAndPage.pageName = pageName
            // store.commit('setUrlLanguage', "/en/");
            // store.commit('setUrl', pathName[1]);
        }

        // const payload = {}
        const { updateLanguage } = this.props
        updateLanguage(languageAndPage.lang)
        console.log(this.props)
        console.log(languageAndPage)
    // payload.parameters = queryParameters;
    // if(!store.state.apiHost && !store.state.host) {
    //   store.commit('setApiHost', apiHost);
    //   store.commit('setHost', host);
    // }
    //
    // payload.host = store.state.apiHost;
    // languageAndPage.host = store.state.apiHost;
    }

    componentDidUpdate() {
        const { matches } = this.props
        console.log(matches)
    }

    render() {
        return (
            <div>
                <h1>Jobs</h1>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateLanguage: language => dispatch(setLanguage(language)),
})

export default connect(null, mapDispatchToProps)(Jobs)
