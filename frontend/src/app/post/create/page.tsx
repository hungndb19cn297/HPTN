'use client'
import { useEffect, useState } from "react";
import { Box, Button } from '@mui/material';
// import axiosAuthClient from "";
import dynamic from 'next/dynamic'
import axiosAuthClient from "@/api/axiosClient";
 
// const axiosPostClient = dynamic(() => import("@/api/axiosPostClient"), { ssr: false });
const MyEditor = dynamic(() => import("@/component/app.full.editor.jsx"), { ssr: false });
const EditorNoToolBar = dynamic(() => import("@/component/app.no.toolbar.editor.jsx"), { ssr: false });

export default function CreatePost() {
    useEffect(() => {
        axiosAuthClient.get('/Post/43')
            .then((response: any) => {
                try {
                    setContentValue(JSON.parse(response.content))
                } catch (error) {
                    setContentValue(response.content)
                }
                try {
                    setTitleValue(JSON.parse(response.title))
                } catch (error) {
                    setTitleValue(response.title)
                }
                setTagIds(response.tagIds)
            })
            .catch(error => console.log(error))
    }, [])
    const [contentValue, setContentValue] = useState();
    const [titleValue, setTitleValue] = useState();
    const [tagIds, setTagIds] = useState();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response: any = await axiosAuthClient.post('/Post', {
                title: JSON.stringify(titleValue),
                content: JSON.stringify(contentValue),
                tagIds: tagIds
            })
            console.log(response)
        } catch (error: any) {
            console.log(error);
        }
    };
    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <EditorNoToolBar value={titleValue} setValue={setTitleValue} placeholder={"Tiêu đề"} />
                <br />
                <MyEditor value={contentValue} setValue={setContentValue} />
                <div style={{ position: 'relative', marginTop: 10 }}>
                    <Button variant="contained" style={{ position: 'absolute', right: 0 }} type="submit">Đăng</Button>
                </div>
            </Box>
        </>
    )
}
