import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "@remixicon/react"
import moment from "moment"

interface Props {
    date: string
    dateSetter: (value: string) => void 
}

const TransactionMonthYear = ({ date, dateSetter }: Props) => {

    const yearDisplay = moment(date).format('YYYY')
    const monthLetters = moment(date).format('MMMM')

    const nextMonth = () => {
        let year = parseInt(date.split('-')[0])
        let month = parseInt(date.split('-')[1])

        if (month === 12) {
            month = 1
            year++
        } else {
            month ++
        }
        const newDate = `${year}-${month}-01`
        dateSetter(newDate)
    }

    const prevMonth = () => {

        let year = parseInt(date.split('-')[0])
        let month = parseInt(date.split('-')[1])

        if (month === 1) {
            month = 12
            year--
        } else {
            month--
        }
        const newDate = `${year}-${month}-01`
        dateSetter(newDate)
    }
    

  return (
    <div className="flex flex-col justify-center items-center gap-4 col-span-2">
        <p>{yearDisplay}</p>
        <div className="w-full flex justify-between items-center px-10">
            <div>
                <RiArrowLeftCircleFill 
                    color="blue"
                    className="hover:cursor-pointer"
                    size={40}
                    onClick={prevMonth}
                />
            </div>
            <p className="text-5xl">{monthLetters}</p>
            <div>
                <RiArrowRightCircleFill 
                    color="blue"
                    className="hover:cursor-pointer"
                    size={40}
                    onClick={nextMonth}
                />
            </div>
        </div>
    </div>
  )
}

export default TransactionMonthYear