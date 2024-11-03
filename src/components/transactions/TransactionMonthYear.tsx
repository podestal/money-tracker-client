import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "@remixicon/react" // Icons for left and right arrows
import moment from "moment" // Moment.js for date formatting
import useTransactionsDateStore from "../../hooks/store/useTransactionsDateStore" // Custom store for managing the transaction date state

// Component that allows users to navigate between months and displays the current year and month
const TransactionMonthYear = () => {

    // Destructure the current date and setter function from the custom hook
    const { date, setDate } = useTransactionsDateStore()
    
    // Extract year and month from the date using moment.js
    const yearDisplay = moment(date).format('YYYY') // Format the year (e.g., '2024')
    const monthLetters = moment(date).format('MMMM') // Format the month (e.g., 'September')

    // Function to move to the next month
    const nextMonth = () => {
        // Extract year and month as integers from the date string
        let year = parseInt(date.split('-')[0])
        let month = parseInt(date.split('-')[1])

        // Handle edge case: if the current month is December, move to January and increment the year
        if (month === 12) {
            month = 1
            year++
        } else {
            month++ // Otherwise, just increment the month
        }

        // Create the new date string in 'YYYY-MM-DD' format and update the state
        const newDate = `${year}-${month}-01`
        setDate(newDate)
    }

    // Function to move to the previous month
    const prevMonth = () => {
        // Extract year and month as integers from the date string
        let year = parseInt(date.split('-')[0])
        let month = parseInt(date.split('-')[1])

        // Handle edge case: if the current month is January, move to December and decrement the year
        if (month === 1) {
            month = 12
            year--
        } else {
            month-- // Otherwise, just decrement the month
        }

        // Create the new date string in 'YYYY-MM-DD' format and update the state

        const newDate = month < 10 ? `${year}-0${month}-01` : `${year}-${month}-01`
        setDate(newDate)
    }

    // Render the year, month, and navigation buttons
    return (
        <div className="flex flex-col justify-center items-center gap-4 lg:col-span-2">
            <p>{yearDisplay}</p> {/* Display the year */}
            <div className="w-full flex justify-center gap-10 lg:gap-2 lg:justify-between items-center px-10">
                <div>
                    <RiArrowLeftCircleFill 
                        color="blue" 
                        className="hover:cursor-pointer" 
                        size={40}
                        onClick={prevMonth} // Go to the previous month when clicked
                    />
                </div>
                <p className="text-3xl lg:text-5xl">{monthLetters}</p> {/* Display the current month */}
                <div>
                    <RiArrowRightCircleFill 
                        color="blue" 
                        className="hover:cursor-pointer" 
                        size={40}
                        onClick={nextMonth} // Go to the next month when clicked
                    />
                </div>
            </div>
        </div>
    )
}

export default TransactionMonthYear
