import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css" // Import default styles for date picker

const DateRange = () => {

    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        console.log("Selected Date:", date); // Handle date selection
    }
  return (
    <div className="w-full flex justify-center items-center">
      <DatePicker
        selected={startDate}
        onChange={(date) => handleDateChange(date)}
        dateFormat="MM/dd/yyyy"
        locale="en-US"
        placeholderText="Select a date"
        className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg focus:ring-2 focus:border-blue-700 focus:outline-none text-slate-50 text-xs" // Tailwind styles for input
        popperClassName="date-picker-popper"
        calendarClassName="rounded-lg shadow-lg text-red-500 p-4"
      />
    </div>
  )
}

export default DateRange