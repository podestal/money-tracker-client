import { useState } from "react";
import { Input } from "../ui/InputText"
import DatePicker from 'react-datepicker'

const ProjectForm = () => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <form
        className="flex flex-col justify-center items-center gap-6 w-[70%] mx-auto my-6"
    >
        <Input 
            placeholder="Project name ..."
        />
        <textarea  // Textarea for transaction description
            placeholder="Description"
            // ref={descriptionRef}
            className="bg-gray-950 border-gray-800 rounded-lg w-full text-sm text-slate-50 h-[100px]"
        />
        <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"  // Customize date format
            isClearable  // Add a clear button
            placeholderText="Select a date"  // Placeholder text
        />
    </form>
  )
}

export default ProjectForm