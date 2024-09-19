import React, { Dispatch, ReactNode, createContext, useContext, useRef } from 'react';

interface SearchConditionProviderProps {
    children: ReactNode;
    initialState?: SearchConditionContextType;
}

export type SearchConditionContextType = { [key: string]: any };

type SearchConditionAction =
    | { type: 'RESET_SEARCH_CONDITION', payload?: { [key: string]: any }  }
    | { type: 'SET_SEARCH_CONDITION'; payload: { [key: string]: any } };

const defaultInitialState = new Object();
const SearchConditionStateContext = createContext<SearchConditionContextType | undefined>(undefined);
const SearchConditionDispatchContext = createContext<Dispatch<SearchConditionAction> | undefined>(undefined);
const SearchConditionInitialStateContext = createContext<SearchConditionContextType | undefined>(undefined);

function reducer(state: SearchConditionContextType, action: SearchConditionAction): SearchConditionContextType {
    switch (action.type) {
        case 'RESET_SEARCH_CONDITION':
            return action.payload || defaultInitialState;
        case 'SET_SEARCH_CONDITION':
            return {
                ...state,
                ...action.payload
            };
        default: {
            throw Error('Unknown action.');
        }
    }
}

export const SearchConditionContextProvider: React.FC<SearchConditionProviderProps> = ({ children, initialState = defaultInitialState }) => {
    const resetStateRef = useRef(initialState);
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const enhancedDispatch = (action: SearchConditionAction) => {
        if (action.type === 'RESET_SEARCH_CONDITION') {
            dispatch({ type: 'RESET_SEARCH_CONDITION', payload: resetStateRef.current });
        } else {
            dispatch(action);
        }
    };

    return (
        <SearchConditionStateContext.Provider value={state}>
            <SearchConditionDispatchContext.Provider value={enhancedDispatch}>
                <SearchConditionInitialStateContext.Provider value={resetStateRef.current}>
                    {children}
                </SearchConditionInitialStateContext.Provider>
            </SearchConditionDispatchContext.Provider>
        </SearchConditionStateContext.Provider>
    );
};

export const useSearchConditionDispatch = () => {
    const context = useContext(SearchConditionDispatchContext);
    if (context === undefined) {
        throw new Error('useSearchConditionDispatch must be used within a SearchConditionProvider');
    }
    return context;
};

export const useSearchConditionContext = <T extends SearchConditionContextType>() => {
    const context = useContext(SearchConditionStateContext);
    if (context === undefined) {
        throw new Error('useSearchConditionContext must be used within a SearchConditionProvider');
    }
    return context as T;
};

export const useInitialSearchConditionContext = <T extends SearchConditionContextType>() => {
    const context = useContext(SearchConditionInitialStateContext);
    if (context === undefined) {
        throw new Error('useInitialSearchConditionContext must be used within a SearchConditionProvider');
    }
    return context as T;
};