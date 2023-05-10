import { useState, createContext, useContext } from 'react'

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({})

//   const login = user => {
//     setUser(user)
//   }

    const addData = (data) =>{
        let newData = {...userData, ...data};
        // console.log(data);
        setUserData(newData);
        // console.log(newData);
    }

    const vanish = () => {
        setUserData(null)
    }

    return (
        <DataContext.Provider value={{ userData, addData, vanish }}>
        {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
  return useContext(DataContext)
}