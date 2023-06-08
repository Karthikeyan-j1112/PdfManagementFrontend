import React, { useState } from 'react'
import AddComment from './AddComment'
import { Stack } from '@mui/system'
import ViewInviteComments from './ViewInviteComments'

function SideBarInvite() {

    const [addingComment, setAddingComment] = useState(false)

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
            <AddComment addingComment={addingComment} setAddingComment={setAddingComment} />
            <ViewInviteComments addingComment={addingComment} />
        </Stack >

    )

}

export default SideBarInvite