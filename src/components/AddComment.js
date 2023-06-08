
import { Alert, Button, Card, CardActions, CardContent, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function AddComment({ addingComment, setAddingComment }) {
    const [name, setName] = useState('')

    const { user } = useAuthContext()

    const params = useParams()
    const inviteId = params.inviteId
    const fileId = params.fileId

    const [comment, setComment] = useState('')
    const [snackOpen, setSnackOpen] = useState(false)
    const [result, setResult] = useState('')
    const [severity, setSeverity] = useState('success')

    useEffect(() => {
        if (user) {
            setName(user.name)
        }
        else {
            setName('')
        }
    }, [user])

    const [fileDetails, setFileDetails] = useState(null)
    const [errorMsg, setErrorMsg] = useState('Loading Details...')

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/files/getpdfinvitedetails/${fileId}`, {
                    params: {
                        inviteId
                    }
                });
                setFileDetails(response.data)

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
    }, [inviteId, fileId])

    const handleAddComment = async () => {
        if (name === null || name.trim().length <= 0) {
            setResult('Enter Your Name')
            setSeverity('error')
            setSnackOpen(true)
            return
        }

        if (comment === null || comment.trim().length <= 0) {
            setResult('Comment cannot be empty')
            setSeverity('error')
            setSnackOpen(true)
            return
        }

        try {
            setAddingComment(true)

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/comments/addComment/${fileId}`, {
                comment, userName: name, inviteId
            })

            if (response.data.result === 'success') {
                setComment('')
                setResult('Comment added successfully')
                setSeverity('success')
                setSnackOpen(true)
            }

            setAddingComment(false)

        } catch (error) {
            console.error('Upload failed:', error);
            setAddingComment(false)
            setResult('Cannot add a comment')
            setSeverity('error')
            setSnackOpen(true)
        }
    }

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
                    fileDetails ?
                        <>
                            <CardContent>
                                <Typography
                                    sx={{
                                        marginLeft: '10px',
                                        marginRight: '10px',
                                        marginBottom: '15px',
                                        fontWeight: 'bold',
                                        color: '#1bb9cd',
                                    }}                                    
                                >
                                    {fileDetails.name}
                                </Typography>
                                <TextField
                                    label='Name'
                                    fullWidth
                                    size='small'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={user !== null}
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#FB04B4',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#FB04B4',
                                            },
                                        },
                                        marginBottom: '10px'
                                    }}
                                />
                                <TextField
                                    label='Comment'
                                    placeholder='Add a Comment'
                                    size='small'
                                    fullWidth
                                    multiline
                                    maxRows={3}
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#FB04B4',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#FB04B4',
                                            },
                                        },
                                        input: { color: '#FB04B4' },
                                        marginBottom: '20px'
                                    }}
                                />

                            </CardContent>
                            <CardActions
                                sx={{
                                    textAlign: 'right',
                                    width: '100%',
                                    position: 'relative'
                                }}
                            >
                                <Button
                                    sx={{
                                        position: 'absolute',
                                        bottom: '7px',
                                        right: '35px',
                                        color: '#FB04B4'
                                    }}
                                    onClick={handleAddComment}
                                    disabled={addingComment || comment === null}
                                >
                                    Add Comment
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
            <Snackbar
                open={snackOpen}
                onClose={() => setSnackOpen(false)}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackOpen(false)} severity={severity} sx={{ width: '100%' }}>
                    {result}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddComment