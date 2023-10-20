import {createContext, useReducer} from 'react';
import {reducer} from './reducers';


type InitialStateType = {
    report: object
}
const initialState = {
    report: undefined,

}

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});


const ContextProvider: any = ({children}: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
    {children}
    </AppContext.Provider>
)
}

export {AppContext, ContextProvider};