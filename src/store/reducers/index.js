const initialState = {
    jobs: {},
    levels: {},
    departments: {},
    locations: {},
    brands: {},
    countries: [],
    countryLocations: {},
    selectedLocations: [],
    selectedCountries: [],
    selectedDepartments: [],
    selectedBrands: [],
    selectedLevels: [],
    translations: {},
    selectedCountryLocations: {},
    currentPage: '',
    totalPages: '',
    unassociatedJobUrl: '',
    searchedJobs: [],
    UrlLanguage: '',
    totalJobs: '',
    host: '',
    apiHost: '',
    url: '',
    appliedFilters: {},
    allTags: [],
}

function rootReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case 'SET_LANGUAGE':
            return {
                ...state,
                UrlLanguage: action.payload.lang,
            }
        default:
            return state
    }
}

export default rootReducer
