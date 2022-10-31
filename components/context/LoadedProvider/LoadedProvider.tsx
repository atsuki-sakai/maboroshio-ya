
import React, { createContext, ReactNode, useContext, useReducer, useMemo } from 'react'


type Action = {
    type: "LOADING" | "LOADED"
}

type LoadModifiers = {
    onLoaded: () => void
    onLoading: () => void
}

type LoadState = {
    isLoaded: boolean
}
type State = LoadState & LoadModifiers

interface Props {
    children: ReactNode | ReactNode[]
}


const initialLoad: LoadState = { isLoaded: false }
const initialModifiers: LoadModifiers = { onLoaded: () => {}, onLoading: () => {} }
const initialState:State = { ...initialLoad, ...initialModifiers }
const LoadedContext = createContext<State>(initialState);

function loadReducer(state: LoadState, action: Action) {
    switch(action.type){
        case "LOADED": {
            return {
                ...state,
                isLoaded: true
            }
        }
        case "LOADING": {
            return {
                ...state,
                isLoaded: false
            }
        }
    }
}


export const LoadedProvider = ({children}: Props) => {

    const [ state, dispatch ] = useReducer(loadReducer, initialState)

    const onLoaded = () => dispatch({type: "LOADED"})
    const onLoading = () => dispatch({type: "LOADING"})
    const value = useMemo(() => {
        return {
            ...state,
            onLoaded,
            onLoading
        }
    },[state])

    return (
        <LoadedContext.Provider value={value}>
            { children }
        </LoadedContext.Provider>
    )
}

export const useLoaded  = () => {
    const context = useContext(LoadedContext);
    return context;
}