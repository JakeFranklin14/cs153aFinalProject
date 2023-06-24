import React, { useState, useContext, createContext } from "react";

const KeyContext = createContext(null)

const KeyProvider = ({value, children}) => {
  const [currentKey,setCurrentKey] = useState(value);

  return (
    <KeyContext.Provider
        value={{currentKey, setCurrentKey}} >
      {children}
    </KeyContext.Provider>
   )
}
export default KeyProvider;
export const useKey = () => useContext(KeyContext);