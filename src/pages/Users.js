import { Stack } from '@mui/system'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Users() {
    return (
        <Stack width='100%' minWidth='450px' color='#FB04B4' alignItems='center' sx={{ cursor: 'default', zIndex: '1' }} >
            <Stack component='header' height='90px' bgcolor='white' alignItems='center' width='100%' boxShadow='0px 2px 10px 1px rgba(0,0,0,0.2)' >
                <Link to='/' tabIndex='-1' style={{ width: '400px' }} > <h1 tabIndex='-1' style={{ color: '#FB04B4' }} > PDF MANAGEMENT </h1> </Link>
            </Stack>
            <Outlet />
        </Stack>
    )
}

export default Users