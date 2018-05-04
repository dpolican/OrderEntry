import { connect } from 'react-redux'

import MenuBar from '../components/MenuBar'
import { setFilters } from '../actions/Filter'

const mapStateToProps = state => {
    return {
        filters: state.filters,
        companies: state.companies,
        statuses: state.statuses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChange: filters => {
            dispatch(setFilters(filters))
        }
    }
}

const AppBar = connect(mapStateToProps, mapDispatchToProps)(MenuBar)

export default AppBar