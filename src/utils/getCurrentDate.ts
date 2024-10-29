import moment from 'moment'

const getCurrentDate = () => {
    const today = moment().format('YYYY-MM-01')
    return today
}

export default getCurrentDate