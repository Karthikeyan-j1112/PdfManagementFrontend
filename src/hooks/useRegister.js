import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuthContext } from './useAuthContext'

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const { dispatchUser } = useAuthContext()
    const navigate = useNavigate()

    const signup = (email, password, confirmPassword, name) => {

        setIsLoading(true)
        setEmptyFields([])

        let emptyCount = 0;
        if (email === '' || email === null) {
            setEmptyFields(['emailId'])
            emptyCount++;
        }
        if (password === '' || password === null) {
            setEmptyFields(prev => [...prev, 'password'])
            emptyCount++;
        }
        if (confirmPassword === '' || confirmPassword === null) {
            setEmptyFields(prev => [...prev, 'confirmPassword'])
            emptyCount++;
        }
        if (name === '' || name === null) {
            setEmptyFields(prev => [...prev, 'name'])
            emptyCount++;
        }
        if (emptyCount > 0) {
            setError('All Fields must be filled')
            setIsLoading(false)
            return
        }
        else if (password !== confirmPassword) {
            setEmptyFields(prev => [...prev, 'password', 'confirmPassword'])
            setError('Entered Passwords are mismatching')
            setIsLoading(false)
            return
        }
        else if (name.length <= 3) {
            setEmptyFields(prev => [...prev, 'name'])
            setError('Name must be atleast 4 Characters')
            setIsLoading(false)
            return;
        }
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + `/api/users/register`,
            data: {
                emailId: email, password, name
            }
        }).then(response => {
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatchUser({ type: 'LOGIN', payload: (response.data) })
            setError(null)
            setIsLoading(false)
            navigate('/')
        }).catch(err => {
            console.log(err);
            if (err.response) {
                setError(err.response.data.error)
                setEmptyFields(err.response.data.errorFields)
            }
            setIsLoading(false)            
        })
    }

    return [error, isLoading, emptyFields, signup]
}