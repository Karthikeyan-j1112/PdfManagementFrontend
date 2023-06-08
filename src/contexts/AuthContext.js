import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [user, dispatchUser] = useReducer(authReducer, JSON.parse(localStorage.getItem('user')))

    const onStorageUpdate = () => {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'))
            axios({
                method: 'post',
                url: process.env.REACT_APP_API_URL + `/api/users/verify`,
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then(response => {
                    if (response.data.verify === "success") {
                        dispatchUser({ type: 'LOGIN', payload: (user) })
                    }
                    else {
                        localStorage.removeItem('user')
                        dispatchUser({ type: 'LOGOUT' })
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.error(error.response.data.error)
                        if (error.response.data.verify === 'fail') {
                            localStorage.removeItem('user')
                            dispatchUser({ type: 'LOGOUT' })
                        }
                    }
                })
        } else {
            dispatchUser({ type: 'LOGOUT' })
        }
    }

    useEffect(() => {
        onStorageUpdate();
        window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, [])

    return (
        <AuthContext.Provider value={{ user, dispatchUser }}>
            {children}
        </AuthContext.Provider>
    )

}
