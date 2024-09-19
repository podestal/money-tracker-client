import moment from 'moment'

const getCurrentDate = () => {
    const today = moment().format('YYYY-MM-DD')
    return today
}

export default getCurrentDate