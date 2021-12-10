import React, { ReactElement, useState } from 'react';
import ResponsiveAppBar from '../../components/app-bar/AppBar';
import { IPost } from '../../services/models/IPost';
import { useNavigate } from "react-router-dom";
import { publishPost } from '../../services/api/postsRequests';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { isUserAuthenticated } from '../../services/utils/Auth';

const CreatePost: React.FC = (): ReactElement => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = (title: string): void => {
        setPostTitle(title)
    }

    const handleBodyChange = (body: string): void => {
        setPostBody(body)
    }

    const addPost = async () => {
        if (!postTitle || !postBody) {
            alert('Заполните все поля!')
            return;
        }

        const post: IPost = {
            id: Math.floor(Math.random() * 10000),
            user_id: 7, // just a stub, replace with a real uid
            title: postTitle,
            body: postBody
        }

        const realPostId =  await publishPost(post)

        navigate(`/posts/${realPostId}`, { state: { postId: realPostId } })
    }

    return (
        <>
            <ResponsiveAppBar />
            { isUserAuthenticated() &&
            <>
            <h2>Добавить статью</h2><Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Post title"
                            value={postTitle}
                            onChange={(e: any) => handleTitleChange(e.target.value)} />
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Your awesome post"
                            onChange={(e: any) => handleBodyChange(e.target.value)}
                            value={postBody}
                            style={{ width: 600, height: 400 }} />
                        <Button variant="contained" onClick={addPost}>Опубликовать</Button>
                    </div>
                </Box></>
            }
            { !isUserAuthenticated() &&
                <p>Только авторизованные пользователи могут создавать статьи!</p>
            }
        </>
    )
}

export default CreatePost
