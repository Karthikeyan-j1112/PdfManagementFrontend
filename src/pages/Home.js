import { IconButton, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import { useLogout } from '../hooks/useLogout'


function Home() {

    const { user } = useAuthContext()

    const { logout } = useLogout()

    return (
        <Stack minWidth={{ xs: '550px', sm: '750px' }} alignItems='center' sx={{ cursor: 'default', zIndex: '1' }} >
            <Stack component='header' height='75px' bgcolor='white' direction='row' alignItems='center' justifyContent='space-between' spacing='10px' width='100%' boxShadow='0px 2px 10px 1px rgba(0,0,0,0.2)' >
                <Link to='/' tabIndex='-1' style={{ width: '350px', paddingLeft: '5px' }} > <Typography variant='h4' fontWeight='bold' minWidth='350px' tabIndex='-1' style={{ color: '#FB04B4' }} > PDF MANAGEMENT </Typography> </Link>
                <Stack paddingRight='20px' minWidth='80px' direction='row' spacing='4px' alignItems='center' >
                    <Typography minWidth='60px' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}> {user.name}</Typography>
                    <Tooltip title='Logout' >
                        <IconButton sx={{ width: '30px', height: '30px' }} color='error' onClick={logout} >
                            <PowerSettingsNewRoundedIcon sx={{ width: '27px', height: '27px' }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
            <Stack direction={{
                xs: 'colomn',
                sm: 'row',
                md: 'row'
            }} columnGap={3} >
                <Outlet />
            </Stack>
        </Stack>


    )
}

export default Home