import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const { dispatchUser } = useAuthContext();
    const navigate = useNavigate()

    const login = (email, password) => {
        setIsLoading(true)
        setEmptyFields([])
        let emptys = []
        if (email === null || email === '') {
            emptys = ['emailId']
        }
        if (password === null || password === '') {
            emptys = [...emptys, 'password']
        }
        if (emptys.length > 0) {
            setEmptyFields(emptys)
            setError('All fields must be filled')
            setIsLoading(false)
            return;                        
        }

        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + `/api/users/login`,
            data: {
                emailId : email,
                password
            }
        })
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data))
                dispatchUser({ type: 'LOGIN', payload: (response.data) })
                setError(null)
                setIsLoading(false)
                setEmptyFields([])
                navigate('/')
            })
            .catch(err => {
                console.log(err);
                if (err.response) {
                    setError(err.response.data.error)
                    setEmptyFields(err.response.data.errorFields)
                }
                setIsLoading(false)
            })
    }

    return [error, isLoading, emptyFields, login]
}