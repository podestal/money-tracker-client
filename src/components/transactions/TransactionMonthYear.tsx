import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "@remixicon/react"

const TransactionMonthYear = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 col-span-2">
        <p>Month</p>
        <div className="w-full flex justify-center items-center gap-8">
            <div>
                <RiArrowLeftCircleFill 
                    color="blue"
                    className="hover:cursor-pointer"
                    size={40}
                />
            </div>
            <p className="text-5xl">September</p>
            <div>
                <RiArrowRightCircleFill 
                    color="blue"
                    className="hover:cursor-pointer"
                    size={40}
                />
            </div>
        </div>
    </div>
  )
}

export default TransactionMonthYear