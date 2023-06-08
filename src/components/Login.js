import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from '../css modules/Form.module.css'
import { useLogin } from '../hooks/useLogin'
import { Link, useNavigate } from 'react-router-dom';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, isLoading, emptyFields, login] = useLogin()
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        document.title = "Login - PDF management"
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        login(email, password);
    }

    const navigate = useNavigate()

    return (
        <Stack
            component='form'
            textAlign='center'
            spacing={2}
            className={styles.body}
            onSubmit={submitHandler}
        >
            <div className={styles.title} >LOG IN</div>
            <Stack spacing={3}>
                <TextField
                    variant='outlined'
                    label='Email'
                    size='small'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        '& label.Mui-focused': {
                            color: '#FB04B4',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#FB04B4',
                            },
                        },
                    }}
                    error={emptyFields.includes('emailId')}
                />
                <TextField
                    variant='outlined'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    size='small'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={emptyFields.includes('password')}
                    sx={{
                        '& label.Mui-focused': {
                            color: '#FB04B4',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#FB04B4',
                            },
                        },
                    }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setShowPassword(prev => !prev)} size='small' >
                                    {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                {error
                    ? <Typography
                        variant='body2'
                        style={{
                            padding: '10px',
                            background: '#ffefef',
                            border: '1px solid #e7195a',
                            color: '#e7195a',
                            borderRadius: '4px',
                            textAlign: 'left',
                            paddingLeft: '20px'
                        }} >{error} </Typography>
                    : null}
            </Stack>
            <Stack alignItems='center' spacing={1} >
                <Typography variant='body2' gutterBottom >
                    Forget Password ? <Link to="/users/reset" >Reset</Link>
                </Typography>
                <Button
                    type='submit'
                    sx={{
                        width: '120px',
                        borderRadius: '25px',
                        backgroundColor: '#FB04B4',
                        fontWeight: 'bold',
                        ":hover": {
                            backgroundColor: '#FB04B4',
                            width: '122px'
                        }
                    }}
                    variant='contained'
                    disabled={isLoading}
                >
                    Login
                </Button>
            </Stack>
            <hr />
            <Stack alignItems='center' spacing={1} >
                <Typography variant='body2' gutterBottom >
                    Don't have an account?
                </Typography>
                <Button
                    sx={{
                        width: '120px',
                        borderRadius: '25px',
                        backgroundColor: '#FB04B4',
                        fontWeight: 'bold',
                        ":hover": {
                            backgroundColor: '#FB04B4',
                            width: '122px'
                        }
                    }}
                    variant='contained'
                    onClick={() => { navigate('/users/register') }}
                >
                    Sign up
                </Button>
            </Stack>
        </Stack >
    )
}

export default Login