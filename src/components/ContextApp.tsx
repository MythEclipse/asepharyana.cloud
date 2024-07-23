'use client'

import { createContext, useState } from 'react'
export const ContextApp = createContext({} as any)

const ContextAppProvider = ({ children }: { children: any }) => {
  const [lokasi, setLokasi] = useState('Jakarta')
  return <ContextApp.Provider value={{ lokasi, setLokasi }}>{children}</ContextApp.Provider>
}
export default ContextAppProvider
