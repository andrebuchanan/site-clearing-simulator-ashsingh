import React, { ReactNode, useMemo, useState } from 'react'

interface AppContextInterface {
  loggedCommands: string[]
  logCommands?: (command: string) => void
}

export const AppContext = React.createContext<AppContextInterface>({
  loggedCommands: []
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [commands, setCommands] = useState<string[]>([])

  const logCommandHandler = (command: string) => {
    setCommands((prevState) => [...prevState, command])
  }

  const contextValue = useMemo(
    () => ({ loggedCommands: commands, logCommands: logCommandHandler }),
    []
  )

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
