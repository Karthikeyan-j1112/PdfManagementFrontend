import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Alert, Button, CircularProgress, Snackbar, Typography } from '@mui/material';
import { Stack } from '@mui/system'
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAuthContext } from '../hooks/useAuthContext';

function Upload() {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [uploading, setUploading] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [result, setResult] = useState('')
    const [severity, setSeverity] = useState('success')

    const { user } = useAuthContext()

    const onDrop = (acceptedFiles) => {
        setSelectedFiles(acceptedFiles)
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 3,
        onDrop
    });
    const buttonColor = selectedFiles.length > 0 ? '#1ecbe1' : '#e7e7e7'

    const uploadFiles = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            setUploading(true)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/files/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`
                },
            });

            console.log('Upload successful:', response.data);
            setResult('File(s) uploaded successfully')
            setSeverity('success')
            setSnackOpen(true)
            setUploading(false)
            setSelectedFiles([])

        } catch (error) {
            console.error('Upload failed:', error);
            setUploading(false)
            setResult('Cannot upload the file(s)')
            setSeverity('error')
            setSnackOpen(true)
        }
    };

    useEffect(() => {
        document.title = "Home - PDF management"
    }, [])

    console.log(selectedFiles);

    return (
        <>
            <Stack
                className="container"
                sx={{
                    borderRadius: '3px', bgcolor: 'white',
                    width: {
                        xs: '500px',
                        sm: '350px',
                        md: '450px',
                        lg: '500px'
                    },
                    minHeight: '350px', maxHeight: '600px',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.05);',
                    alignItems: 'center', marginTop: '40px',
                    marginBottom: '20px'
                }}
            >
                <h1 style={{ fontSize: '27px', color: '#1BB9CD' }} >UPLOAD HERE</h1>
                <Stack {...getRootProps({ className: 'dropzone' })}
                    style={{ height: '120px', justifyItems: 'center', justifyContent: 'center' }}
                    sx={{
                        border: '2px dashed #1ecbe1',
                        width: {
                            xs: '430px',
                            sm: '320px',
                            md: '370px',
                            lg: '430px'
                        },
                        borderRadius: '3px',

                        cursor: 'pointer',
                        minHeight: '250px',
                        color: 'gray'
                    }}
                >
                    <input {...getInputProps()} />
                    <Typography gutterBottom marginLeft='20px' marginRight='20px' component='div' >
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <em>(Only *.pdf files and maximum 3 files will only be accepted )</em>
                    </Typography>
                </Stack>
                <Stack
                    marginTop='30px'
                    alignContent='flex-start'
                    textAlign='left'
                    alignItems='flex-start'
                    width={{
                        xs: '430px',
                        sm: '320px',
                        md: '370px',
                        lg: '430px'
                    }}
                >
                    {selectedFiles.map((file, index) => <>
                        <Fragment key={index} >
                            <Button
                                size='small'
                                variant='contained'
                                sx={{
                                    maxWidth: {
                                        xs: '430px',
                                        sm: '320px',
                                        md: '370px',
                                        lg: '430px'
                                    },
                                }}
                                style={{
                                    borderRadius: '50px',
                                    padding: '15px',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    textAlign: 'left',
                                    maxHeight: '35px',
                                    backgroundColor: '#1ecbe1',
                                    color: 'black'
                                }}
                                endIcon={
                                    <CancelRoundedIcon />
                                }
                                onClick={() => {
                                    let arr = selectedFiles.map(file => file)
                                    arr.splice(index, 1)
                                    setSelectedFiles(arr)
                                }}
                                disabled={uploading}
                            >
                                <Typography
                                    style={{
                                        maxHeight: '20px',
                                        maxWidth: {
                                            xs: '430px',
                                            sm: '320px',
                                            md: '430px'
                                        },
                                        fontSize: '12px',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {file.name}
                                </Typography>
                            </Button>
                            <br />
                        </Fragment>
                    </>)}
                </Stack>
                <Button
                    disabled={!(selectedFiles.length > 0) || uploading}
                    variant='outlined'
                    style={{
                        borderRadius: '50px',
                        marginBottom: '30px',
                        color: buttonColor
                    }}
                    onClick={uploadFiles}
                >
                    Upload  {uploading ? <CircularProgress size={20} sx={{ marginLeft: '4px' }} /> : null}
                </Button>
            </Stack>
            <Snackbar
                open={snackOpen}
                onClose={() => setSnackOpen(false)}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackOpen(false)} severity={severity} sx={{ width: '100%' }}>
                    {result}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Upload