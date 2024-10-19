import Selector from "../ui/Selector"

const options = [
    {
        id: 1,
        name: 'Active'
    },
    {
        id: 2,
        name: 'Inactive'
    },
]

interface Props {
    setSelectedFilter: (val: any) => void
}   

const ProjectsFilter = ({ setSelectedFilter }: Props) => {

  return (
    <Selector 
        defaultValue={1} 
        values={options} 
        setter={setSelectedFilter} 
        label="Status" 
    />
  )
}

export default ProjectsFilter