import { createContext } from 'react'

export const Context = createContext({
    session: {},
    setSession: () => {},
    token: '',
    setToken: () => {},
    config: {},
    postMessageS: ''
})