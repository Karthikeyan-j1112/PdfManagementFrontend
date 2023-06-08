import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from '../css modules/Form.module.css'

import { useNavigate } from 'react-router-dom';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useRegister } from '../hooks/useRegister';

function Register() {

  const [name, setName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, isLoading, emptyFields, signup] = useRegister()
  const [passwordError, setPasswordError] = useState(null)

  useEffect(() => {
    document.title = "Register - PDF management"
  }, [])

  useEffect(() => {
    if (error === "Password is not Strong") {
      setPasswordError(['8 characters long', 'contains one number',
        'contains one capital letter', 'contains one small letter',
        'contains one special character'])
    }
    else {
      setPasswordError(null)
    }
  }, [error])

  const submitHandler = (e) => {
    e.preventDefault();
    signup(emailId, password, confirmPassword, name)
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
      <div className={styles.title} >SIGN UP</div>
      <Stack spacing={3}>
        <TextField
          variant='outlined'
          label='Email'
          size='small'
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
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
          error={emptyFields.includes('password')}
          InputProps={{
            endAdornment:
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPassword(prev => !prev)} size='small' >
                  {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                </IconButton>
              </InputAdornment>
          }}
        />

        {passwordError ?
          <Typography
            variant='body2'
            style={{
              padding: '10px',
              background: '#ffefef',
              border: '1px solid #e7195a',
              color: '#e7195a',
              borderRadius: '4px',
              textAlign: 'left',
              paddingLeft: '20px'
            }}
          >
            Password must be: <br />
            {
              passwordError.map((item, index) => <li key={index}>{item}</li>)
            }
          </Typography> :
          null
        }

        <TextField
          variant='outlined'
          label='Confirm Password'
          type={showConfirmPassword ? 'text' : 'password'}
          size='small'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
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
          error={emptyFields.includes('confirmPassword')}
          InputProps={{
            endAdornment:
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowConfirmPassword(prev => !prev)} size='small' >
                  {showConfirmPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                </IconButton>
              </InputAdornment>
          }}
        />

        <TextField
          variant='outlined'
          label='Full Name'
          size='small'
          value={name}
          onChange={e => setName(e.target.value)}
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
          error={emptyFields.includes('name')}
        />

        {error ?
          <Typography
            variant='body2'
            style={{
              padding: '10px',
              background: '#ffefef',
              border: '1px solid #e7195a',
              color: '#e7195a',
              borderRadius: '4px',
              textAlign: 'left',
              paddingLeft: '20px'
            }}
          >
            {error}
          </Typography>
          : null
        }
      </Stack>
      <Stack alignItems='center' spacing={1} >
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
          Sign up
        </Button>
      </Stack>
      <hr />
      <Stack alignItems='center' spacing={1} >
        <Typography variant='body2' gutterBottom >
          Already have an account?
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
          onClick={() => { navigate('/users/login') }}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  )
}

export default Register