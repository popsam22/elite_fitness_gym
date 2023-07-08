import {useContext} from 'react'
import { WorkoutsContext } from '../context/WorkoutsContext'

const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext) //returns the value prop from the context provider

  if(!context){
    throw Error('Context must be used inside the scope of the WorkoutsContextProvider')
  }
   
  return context
}

export default useWorkoutsContext