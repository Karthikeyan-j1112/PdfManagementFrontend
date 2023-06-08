import { Card, CardContent, CircularProgress, IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { ArrowForwardIosRounded } from '@mui/icons-material'
import { useAuthContext } from '../hooks/useAuthContext'

function ViewComments() {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const params = useParams()
    const id = params.id

    const { user } = useAuthContext()

    useEffect(() => {
        if (page !== '') {
            (async () => {
                setLoading(true)
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/files/getFileComments/${id}`,
                        {
                            params: {
                                page: isNaN(page) ? 0 : page - 1
                            },
                            headers: {
                                Authorization: `Bearer ${user.token}`
                            },
                        })
                    if (response.data.result) {
                        setComments(response.data.comments)
                        setTotalPages(response.data.totalPages)
                        setLoading(false)
                    }
                } catch (error) {
                    console.log(error);
                    setComments([])
                    setPage(1)
                    setTotalPages(0)
                    setLoading(false)
                }
            })();
        }

    }, [page, id, user])

    return (
        <Card
            sx={{
                width: {
                    xs: '480px',
                    sm: '30vw',
                },
                minWidth: '225px',
                position: 'relative',
                paddingBottom: '45px'
            }}
        >
            <CardContent>
                <Typography textAlign='left' fontWeight='bold' >Comments</Typography>
                {loading ?
                    <Stack direction='row' alignItems='center' justifyContent='center' marginTop='10px' >
                        <Typography>Loading Comments</Typography>
                        <CircularProgress size={20} sx={{ marginLeft: '4px' }} />
                    </Stack>
                    : <>{comments.length > 0 ?
                        <>
                            {comments.map(comment =>
                                <Card
                                    sx={{
                                        bgcolor: '#f1f1f1',
                                        padding: '10px',
                                        marginTop: '10px'
                                    }}
                                    key={comment._id}
                                >
                                    <Stack>
                                        <Typography textAlign='left' fontWeight='bold' >{comment.userName}</Typography>
                                        <Typography textAlign='left' sx={{ wordWrap: 'break-word' }} >{comment.comment}</Typography>
                                    </Stack>
                                </Card>
                            )}
                        </> :
                        <>
                            <Stack direction='row' alignItems='center' justifyContent='center' marginTop='10px' >
                                <Typography>No Comments</Typography>
                            </Stack>
                        </>
                    }</>
                }

            </CardContent>
            <Stack
                sx={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '20px'
                }}
                width='100%'
                direction='row'
                justifyContent='right'
                alignItems='center'
            >
                {totalPages > 0 ? <>
                    <IconButton
                        sx={{ bgcolor: '#1BB9CD', color: 'white', height: '25px', width: '25px', ':hover': { color: '#1BB9CD' } }} size='small'
                        disabled={page === 1}
                        onClick={() => {
                            setPage(prev => {
                                if (prev === '') {
                                    return 1
                                }
                                else {
                                    return parseInt(prev) - 1
                                }
                            })
                        }}
                    >
                        <ArrowBackIosNewRoundedIcon sx={{ height: '18px', width: '18px', marginRight: '2px' }} />
                    </IconButton>
                    <input
                        style={{
                            marginLeft: '5px'
                        }}
                        value={page}
                        onChange={e => setPage(prev => {
                            if (isNaN(e.target.value) || e.target.value === '' || e.target.value === null)
                                return ''
                            else if (parseInt(e.target.value) > totalPages || parseInt(e.target.value) < 1)
                                return prev
                            else
                                return parseInt(e.target.value)
                        })}
                        className='custom-input'
                    />
                    <Typography color='#1BB9CD' marginLeft='2px' marginRight='5px' > /{totalPages}</Typography>
                    <IconButton
                        sx={{ bgcolor: '#1BB9CD', color: 'white', height: '25px', width: '25px', ':hover': { color: '#1BB9CD' } }} size='small'
                        disabled={page === totalPages}
                        onClick={() => {
                            setPage(prev => {
                                if (prev === '') {
                                    return 1
                                }
                                else {
                                    return parseInt(prev) + 1
                                }
                            })
                        }}
                    >
                        <ArrowForwardIosRounded sx={{ height: '18px', width: '18px', marginLeft: '2px' }} />
                    </IconButton>
                </> : null}
            </Stack>

        </Card>
    )
}

export default ViewComments