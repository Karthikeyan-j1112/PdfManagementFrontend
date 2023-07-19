import { SearchRounded } from '@mui/icons-material'
import { IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import '../css modules/Search.css'
import { Link } from 'react-router-dom'

function Search() {

    const [search, setSearch] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [files, setFiles] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { user } = useAuthContext()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/files/searchFiles/${search === '' ? null : search}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        },
                        params: {
                            page: isNaN(page) ? 0 : page - 1
                        }
                    })
                if (response.data.result) {
                    setFiles(response.data.files)
                    setTotalPages(response.data.totalPages)
                }
            } catch (error) {
                console.log(error);
                setFiles([])
                setPage(1)
                setTotalPages(0)
            }
        })();
    }, [search, page, user])

    return (
        <Stack
            sx={{
                borderRadius: '3px', bgcolor: 'white',
                width: {
                    xs: '500px',
                    sm: '350px',
                    md: '450px',
                    lg: '500px'
                },
                minHeight: '230px', height: 'auto',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.05);',
                alignItems: 'center', marginTop: '40px',
                marginBottom: '40px',
                position: 'relative'
            }}
        >
            <h1 style={{ fontSize: '27px', color: '#1BB9CD', }} >SEARCH</h1>
            <TextField size='small'
                sx={{
                    width: {
                        xs: '450px',
                        sm: '300px',
                        md: '400px',
                        lg: '450px'
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#1ecbe1',
                        },
                    },
                    input: { color: isFocused ? '#1BB9CD' : '#a2a2a2' },
                    marginBottom: '20px'
                }}
                InputProps={{
                    endAdornment:
                        <InputAdornment position='end'>
                            <IconButton size='small' >
                                <SearchRounded sx={{ color: isFocused ? '#1ecbe1' : '#a2a2a2' }} />
                            </IconButton>
                        </InputAdornment>
                }}
                placeholder='Enter the File name to Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <Table
                sx={{
                    width: {
                        xs: '450px',
                        sm: '300px',
                        md: '400px',
                        lg: '450px'
                    },
                    marginBottom: '50px'
                }}
                size='small'
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                maxWidth: {
                                    xs: '300px',
                                    sm: '150px',
                                    md: '250px',
                                    lg: '300px'
                                },
                            }}
                        >
                            File Name
                        </TableCell>
                        <TableCell align="right">Uploaded</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map((file) => (
                        <TableRow
                            key={file._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                sx={{
                                    maxWidth: {
                                        xs: '350px',
                                        sm: '200px',
                                        md: '300px',
                                        lg: '350px'
                                    },
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                <Link to={'pdfs/' + file._id} ><Typography style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >
                                    {file.name}
                                </Typography></Link>
                            </TableCell>
                            <TableCell align="right">{file.upload}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {
                (files.length > 0 ) ?
                    <Stack width='100%' direction='row' justifyContent='right' alignItems='center'
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            marginRight: '40px'
                        }}
                    >
                        <input
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
                        <Typography color='#1BB9CD' marginLeft='2px' > /{totalPages}</Typography>
                    </Stack>
                    : <>No Result</>
            }
        </Stack>
    )
}

export default Search
