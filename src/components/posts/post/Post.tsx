import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'

import ResponsiveAppBar from '../../app-bar/AppBar';
import LikeButton from './LikeButton';
import { getCurrentUserId } from '../../../services/utils/Auth';
import { saveLikedPost } from '../../../services/utils/Post';
import { getPostById } from '../../../services/api/postsRequests';

import './style.css'
import { IPost } from '../../../services/models/IPost';

const Post: React.FC = (): ReactElement => {
    const [post, setPost] = useState<IPost>()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getPostById(location.state?.postId)
        .then((res) => { 
            setPost(res)
        })
    }, [location.state?.postId])

    return (
        <>
            <ResponsiveAppBar />
            <div className="post-container">
                { post?.title &&
                <Box sx={{minWidth: 250, maxWidth: '50%'}}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h4" gutterBottom component="div">
                                {post.title}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.primary">
                                { post.body }
                            </Typography>
                        </CardContent>
                        <Divider sx={{ maxWidth: 270, margin: 'auto'}}/>
                        <CardActions disableSpacing>
                            <LikeButton postId={Number(post.id)} likePost={() => saveLikedPost(getCurrentUserId(), Number(post.id)) }  />
                            <Button size="small" sx={{ marginLeft: '55%'}} onClick={() => { navigate("/posts") }}>Назад</Button>
                        </CardActions>
                    </Card>
                </Box>
                }
            </div>
        </>
    )
}

export default Post
