import { Stack } from '@mui/system'
import React from 'react'
import Share from './Share'
import ViewComments from './ViewComments'

function SideBar() {

    return (
        <Stack
            sx={{
                minHeight: '250px',
                width:
                {
                    xs: '480px',
                    sm: '30vw',
                },
                minWidth: '225px',
                marginBottom: '10px'
            }}
            spacing={1}
        >
            <Share />
            <ViewComments />
        </Stack >
    )
}

export default SideBar