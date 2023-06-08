import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PdfViewInvite() {

    const params = useParams()
    const inviteId = params.inviteId
    const fileId = params.fileId

    const [fileUrl, setFileUrl] = useState(null)
    const [errorMsg, setErrorMsg] = useState('Loading PDF...')

    const transform = (slot) => ({
        ...slot,
        Download: () => <></>,
        DownloadMenuItem: () => <></>,
        EnterFullScreen: () => <></>,
        EnterFullScreenMenuItem: () => <></>,
        SwitchTheme: () => <></>,
        SwitchThemeMenuItem: () => <></>,
        Open: () => <></>,
        OpenMenuItem: () => <></>,
        Print: () => <></>,
        PrintMenuItem: () => <></>,
        // SwitchSelectionMode : ()=><></>,
        // SwitchSelectionModeMenuItem : ()=><></>
    });

    const renderToolbar = (Toolbar) => (
        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar,
    });

    const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance;

    useEffect(() => {
        document.title = "View File Invite - PDF management"
    }, [])

    console.log(inviteId, fileId);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/files/getpdfinvite/${fileId}`, {
                    responseType: 'blob',
                    params: {
                        inviteId
                    }
                });
                const file = new File([response.data], 'file.pdf', {
                    type: 'application/pdf',
                });

                setFileUrl(URL.createObjectURL(file));
            } catch (error) {
                console.error('Error fetching file:', error);
                if (error.response.status === 401) {
                    setErrorMsg("You don't have access to the file")
                }
                if (error.response.status === 400) {
                    setErrorMsg("There is something went wrong")
                }
            }
        })()
    }, [fileId, inviteId])

    return (
        <>
            {fileUrl ? (
                <div
                    className='pdf-container'
                    style={{
                        height: 'calc(100vh - 100px)', minHeight: '650px',
                        width: '65vw', minWidth: '485px',
                        marginTop: '10px',
                        marginBottom: '15px'
                    }}
                >
                    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
                    </Worker>
                </div>
            ) : (
                <div
                    className='pdf-container'
                    style={{
                        height: 'calc(100vh - 100px)', minHeight: '220px',
                        width: '65vw', minWidth: '485px',
                        marginTop: '10px'
                    }}
                >
                    {errorMsg}
                </div>
            )}

        </>
    )
}

export default PdfViewInvite