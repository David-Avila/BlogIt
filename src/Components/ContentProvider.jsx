import { createContext } from 'react'

export const ContentContext = createContext();

export function ContentProvider({children, data}){
    return (
        <ContentContext.Provider value={data}>
            {children}
        </ContentContext.Provider>
    )
}