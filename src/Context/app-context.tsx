import React, { ReactNode, useMemo, useState } from 'react'

type Session = {
  init: boolean
  quit: boolean
}

interface AppContextInterface {
  fuelConsumed: number[]
  itemizedCosts: number[]
  loggedCommands: string[]
  sessionState: Session
  siteData: string[][]
  logCommand: (command: string) => void
  saveSiteData: (data: string[][]) => void
  updateCost: (price: number) => void
  updateFuel: (quantity: number) => void
  updateSession: (session: Session) => void
}

export const AppContext = React.createContext<AppContextInterface>({
  fuelConsumed: [],
  itemizedCosts: [],
  loggedCommands: [],
  sessionState: { init: true, quit: false },
  siteData: [],
  logCommand: () => undefined,
  saveSiteData: () => undefined,
  updateCost: () => undefined,
  updateFuel: () => undefined,
  updateSession: () => undefined
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [commands, setCommands] = useState<string[]>([])
  const [cost, setCost] = useState<number[]>([])
  const [fuel, setFuel] = useState<number[]>([])
  const [session, setSession] = useState<Session>({ init: true, quit: false })
  const [siteInput, setSiteInput] = useState<string[][]>([])

  const logCommandHandler = (command: string) => {
    setCommands((prevState) => [...prevState, command])
  }

  const saveSiteDataHandler = (data: string[][]) => {
    setSiteInput(data)
  }

  const updateCostHandler = (price: number) => {
    setCost((prevState) => [...prevState, price])
  }

  const updateFuelHandler = (quantity: number) => {
    setFuel((prevState) => [...prevState, quantity])
  }

  const updateSessionHandler = (sessionProp: Session) => {
    console.log('session', sessionProp)
    if (sessionProp.quit) console.log('quit')
    setSession(sessionProp)
  }

  const contextValue = useMemo(
    () => ({
      fuelConsumed: fuel,
      itemizedCosts: cost,
      loggedCommands: commands,
      sessionState: session,
      siteData: siteInput,
      logCommand: logCommandHandler,
      saveSiteData: saveSiteDataHandler,
      updateCost: updateCostHandler,
      updateFuel: updateFuelHandler,
      updateSession: updateSessionHandler
    }),
    [commands, cost, fuel, session, siteInput]
  )

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
