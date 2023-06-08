import { Alert, Button, Card, CardActions, CardContent, Fade, Modal, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { Box } from '@mui/system'

function Share() {

    const params = useParams()
    const id = params.id

    const { user } = useAuthContext()

    const [fileDetails, setFileDetails] = useState(null)
    const [errorMsg, setErrorMsg] = useState('Loading Details...')
    const [open, setOpen] = useState(false)

    const [inviteLink, setInviteLink] = useState('')

    const [snackOpen, setSnackOpen] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/files/getpdfdetails/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    },
                });
                setFileDetails(response.data)
                setInviteLink(`${window.location.host}/pdf/invite/${response.data.inviteId}/${id}`)

            } catch (error) {
                console.error(error);
                if (error.response.status === 401) {
                    setErrorMsg("You don't have access to the file")
                }
                if (error.response.data.error.kind === 'ObjectId') {
                    setErrorMsg("There is something wrong with the file id")
                }
                if (error.response.status === 400) {
                    setErrorMsg("There is something went wrong")
                }
            }
        })()
    }, [user, id])


    return (
        <>
            <Card
                sx={{
                    width:
                    {
                        xs: '480px',
                        sm: '30vw',
                    },
                    minWidth: '225px',
                    marginTop: '10px',
                    paddingTop: '10px'
                }}
            >
                {
                    fileDetails ? <>
                        <CardContent>
                            <Typography
                                sx={{
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                    marginBottom: '10px',
                                    fontWeight: 'bold',
                                    color: '#1bb9cd',
                                }}
                            >
                                {fileDetails.name}
                            </Typography>
                            <Typography
                                sx={{
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                    color: '#fb04b4'
                                }}
                            >
                                Uploaded at : {fileDetails.upload}
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{ marginLeft: '15px' }}
                        >
                            <Button
                                endIcon={<ShareRoundedIcon />}
                                onClick={() => setOpen(true)}
                            >
                                Share
                            </Button>

                        </CardActions>
                    </> : <>
                        <CardContent >
                            <Typography
                                sx={{
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                    fontWeight: 'bold',
                                    color: '#d32f2f'
                                }}
                            >
                                {errorMsg}
                            </Typography>
                        </CardContent>
                    </>
                }
            </Card>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open} >
                    <Card
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'white',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <CardContent>
                            <Typography color='#fb04b4' variant='h5' gutterBottom >Link to Share the PDF</Typography>
                            <Box
                                sx={{
                                    width: '100%',
                                    bgcolor: '#f1f1f1',
                                    padding: '10px',
                                    transform: 'translate(-10px, 0)',
                                    overflowWrap: 'break-word'
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(inviteLink)
                                    setSnackOpen(true)
                                }}
                            >
                                {inviteLink}
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(inviteLink)
                                    setSnackOpen(true)
                                }}
                            >
                                Copy to Clipboard
                            </Button>

                        </CardActions>
                    </Card>
                </Fade>
            </Modal>
            <Snackbar
                open={snackOpen}
                onClose={() => setSnackOpen(false)}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Copied to clipboard
                </Alert>
            </Snackbar>
        </>
    )
}

export default Share