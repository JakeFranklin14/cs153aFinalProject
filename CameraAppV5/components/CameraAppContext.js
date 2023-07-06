import React, { useState, useContext, createContext } from "react";

const AppContext = createContext(null)

const AppProvider = ({value, children}) => {
  const [currentValue,setCurrentValue] = useState(value);

  return (
    <AppContext.Provider
        value={{currentValue, setCurrentValue}} >
      {children}
    </AppContext.Provider>
   )
}
export default AppProvider;
export const useValue = () => useContext(AppContext);