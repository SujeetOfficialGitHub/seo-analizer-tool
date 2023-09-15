import { useContext, createContext, useState } from "react";

const DataContext = createContext({})


const ContextProvider = ({children}) => {
    const [analizedData, setAnalizedData] = useState([])
    const [requestUrl, setRequestUrl] = useState('')
    const [taskId, setTaskId] = useState('')
    
  return (
    <DataContext.Provider value={{
        analizedData,
        setAnalizedData,
        requestUrl,
        setRequestUrl,
        taskId,
        setTaskId
    }}>
        {children}
    </DataContext.Provider>
  )
}

export const DataState = () => {
    return useContext(DataContext)
}

export default ContextProvider