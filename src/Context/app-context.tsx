import React, { ReactNode, useMemo, useState } from 'react'

interface AppContextInterface {
  loggedCommands: string[]
  logCommand: (command: string) => void
}

export const AppContext = React.createContext<AppContextInterface>({
  loggedCommands: [],
  logCommand: () => undefined
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [commands, setCommands] = useState<string[]>([])

  const logCommandHandler = (command: string) => {
    setCommands((prevState) => [...prevState, command])
  }

  const contextValue = useMemo(
    () => ({ loggedCommands: commands, logCommand: logCommandHandler }),
    [commands]
  )

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
