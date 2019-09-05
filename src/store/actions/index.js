import axios from 'axios'

export const setJobs = jobs => ({
    type: 'SET_JOBS',
    payload: {
        jobs,
    },
})

export const setDepartments = departments => ({
    type: 'SET_DEPARTMENTS',
    payload: {
        departments,
    },
})

export const setLocations = locations => ({
    type: 'SET_LEVELS',
    payload: {
        locations,
    },
})

export const setCountries = countries => ({
    type: 'SET_COUNTRIES',
    payload: {
        countries,
    },
})

export const setLocationsAndCountries = locations => (dispatch) => {
    const tempLocations = []
    const tempCountries = []
    let data = {}
    const locationKeys = Object.keys(locations)
    for (let i = 0, len = locationKeys.length; i < len; i++) {
        const key = locationKeys[i]
        data[key] = locations[key]
        tempLocations.push(data)
        data = {}
        tempCountries.push(key)
    }

    dispatch(setLocations(tempLocations))
    dispatch(setCountries(tempCountries))
}

export const setLevels = levels => ({
    type: 'SET_LEVELS',
    payload: {
        levels,
    },
})
export const setLocationsForCountries = (data) => {
    let countryLocations = data
    try {
        countryLocations = countryLocations.reduce(
            (obj, item) => Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item) }), {},
        )
    } catch (error) {
    // do nothing
    }
    return {
        type: 'SET_COUNTRYLOCATIONS',
        payload: {
            countryLocations,
        },
    }
}

export const setBrands = brands => ({
    type: 'SET_BRANDS',
    payload: {
        brands,
    },
})
export const setCurrentPage = page => ({
    type: 'SET_CURRENT_PAGE',
    payload: {
        page,
    },
})
export const setTotalPages = totalPages => ({
    type: 'SET_TOTAL_PAGES',
    payload: {
        totalPages,
    },
})
export const setUnassociatedJobUrl = url => ({
    type: 'SET_UNASSOCIATED_JOB_URL',
    payload: {
        url,
    },
})
export const setTotalJobs = totalJobs => ({
    type: 'SET_TOTAL_JOBS',
    payload: {
        totalJobs,
    },
})

export const setTranslations = (translations) => {
    const tempTranslations = {
        jobs: {},
    }

    const keys = Object.keys(translations)
    keys.some((key) => {
        if (key.indexOf('jobs-smartrecruiters-vue') !== -1) {
            tempTranslations.jobs = translations[key]
            return true
        }
        return false
    })

    return {
        type: 'SET_TRANSLATIONS',
        payload: {
            translations: tempTranslations,
        },
    }
}

export const setLanguage = lang => ({
    type: 'SET_LANGUAGE',
    payload: {
        lang,
    },
})

export const fetchJobs = ({ host, parameters }) => dispatch => axios.get(`${host}/smart-recruiters/jobs/${encodeURIComponent(parameters)}`)
    .then((response) => {
        const { data } = response
        dispatch(setJobs(data.jobs.jobs))
        dispatch(setDepartments(data.jobs.departments))
        dispatch(setLocationsAndCountries(data.jobs.locations))
        dispatch(setLocationsForCountries(data.jobs.locations))
        dispatch(setLevels(data.jobs.levels))
        dispatch(setCountries(data.jobs.countries))
        dispatch(setBrands(data.jobs.brands))
        dispatch(setCurrentPage(+data.jobs.currentPage))
        dispatch(setTotalPages(data.jobs.resultPages))
        dispatch(setUnassociatedJobUrl(data.jobs.unassociatedJobUrl))
        dispatch(setTotalJobs(data.jobs.total))
    })
    .catch((error) => {
        throw (error)
    })

export const fetchSearchedJobs = ({ host, parameters }) => (
    dispatch => axios.get(`${host}/smart-recruiters/jobs/search/${encodeURIComponent(parameters)}`)
        .then((response) => {
            const { data } = response

            const tempJobs = data.jobs.jobs
            const jobs = []

            for (let i = 0, len = tempJobs.length; i < len; i++) {
                jobs.push(tempJobs[i]._source)
            }
            dispatch(setJobs(jobs))

            dispatch(setTotalPages(Math.ceil(data.jobs.hits.total / 15)))
            dispatch(setTotalJobs(data.jobs.hits.total))

            // Set only if new filters are returned
            if (Object.prototype.hasOwnProperty.call(data.filters, 'level')) {
                dispatch(setLevels(data.jobs.levels))
            }
            if (Object.prototype.hasOwnProperty.call(data.filters, 'department')) {
                dispatch(setDepartments(data.jobs.departments))
            }
            if (Object.prototype.hasOwnProperty.call(data.filters, 'brand')) {
                dispatch(setBrands(data.jobs.brands))
            }
            if (Object.prototype.hasOwnProperty.call(data.filters, 'countryLocation')) {
                dispatch(setLocationsAndCountries(data.jobs.locations))
            }
        })
        .catch((error) => {
            throw (error)
        })
)

export const fetchTranslations = ({ host, lang, pageName }) => dispatch => axios.get(`${host}/smart-recruiters/pages/${lang}/${pageName}/translations`)
    .then((response) => {
        const { data } = response
        dispatch(setTranslations(data.jobs.jobs))
    })
    .catch((error) => {
        throw (error)
    })
