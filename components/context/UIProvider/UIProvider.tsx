
import React, {
    createContext,
    useContext,
    useReducer,
    useMemo,
    ReactNode
} from "react";

interface Props {
    children: ReactNode | ReactNode[]
}

type StateValues = {
    isDrawerOpen: boolean
    isCartOpen: boolean
}
type StateModifier = {
    onDrawerOpen: () => void
    onDrawerClose: () => void
    onCartOpen: () => void
    onCartClose: () => void
}

type Action = {
    type: "DRAWER_CLOSE" | "DRAWER_OPEN" | "CART_OPEN" | "CART_CLOSE"
}

type State = StateValues & StateModifier

const initialValue: StateValues = {
    isDrawerOpen: false,
    isCartOpen: false
}
const initalModifier: StateModifier = {
    onDrawerOpen: () => {},
    onDrawerClose: () => {},
    onCartOpen: () => {},
    onCartClose: () => {}
}

const initialState: State = {
    ...initialValue,
    ...initalModifier
}

const uiReducer = (state: StateValues, action: Action) => {
    switch(action.type){
        case "DRAWER_OPEN": {
            return {
                ...state,
                isDrawerOpen: true,
                isCartOpen: false
            }
        }
        case "DRAWER_CLOSE": {
            return {
                ...state,
                isDrawerOpen: false,
                isCartOpen: false
            }
        }
        case "CART_OPEN": {
            return {
                ...state,
                isDrawerOpen: false,
                isCartOpen: true
            }
        }
        case "CART_CLOSE": {
            return {
                ...state,
                isDrawerOpen: false,
                isCartOpen: false
            }
        }
    }
}

const UIProviderContext = createContext<State>(initialState)

export const UIProvider = ({children}: Props) => {

    const [ state, dispatch ] = useReducer(uiReducer, initialState)
    const onDrawerClose = () => dispatch({type: "DRAWER_CLOSE"})
    const onDrawerOpen = () => dispatch({type: "DRAWER_OPEN"})
    const onCartClose = () => dispatch({type: "CART_CLOSE"})
    const onCartOpen = () => dispatch({type: "CART_OPEN"})

    const value = useMemo(() => {
        return {
            ...state,
            onDrawerClose,
            onDrawerOpen,
            onCartOpen,
            onCartClose
        }
    },[state])

    return (
        <UIProviderContext.Provider value={value}>
            { children }
        </UIProviderContext.Provider>
    )
}

export const useUI = () => {
    const context = useContext(UIProviderContext)
    return context;
}