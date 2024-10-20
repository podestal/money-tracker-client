import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css" // Import default styles for date picker

interface Props {
    dueDate: Date | null
    setDueDate: (dueDate: Date) => void
}

const DateRange = ({ dueDate, setDueDate }: Props) => {

    const handleDateChange = (date: Date | null) => {
        if (date === null) {
            return
        }
        setDueDate(date);
    }
  return (
    <div className="w-full flex justify-center items-center">
      <DatePicker
        selected={dueDate}
        onChange={(date) => handleDateChange(date)}
        dateFormat="MM/dd/yyyy"
        locale="en-US"
        placeholderText="Select a date"
        className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg focus:ring-2 focus:border-blue-700 focus:outline-none text-slate-50 text-xs"
        calendarClassName="rounded-lg shadow-lg p-4"
      />
    </div>
  )
}

export default DateRange