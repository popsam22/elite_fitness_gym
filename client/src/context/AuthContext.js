import {createContext, useReducer, useEffect} from 'react'

const AuthContext = createContext()

//action type constants
const LOGIN = "login"
const LOGOUT = 'logout'

const authReducer = (state, action) => {
    if(action.type === LOGIN){
        return {
            user: action.payload
        }
    }
    if(action.type === LOGOUT){
        return{
            user: null
        }
    }
    return state
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //checks if user exists by checking the local storage 
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({
                type: "login",
                payload: user 
            })
        }
    }, [])
    console.log("AuthContext state: ", state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, authReducer}
export default AuthContextProvider