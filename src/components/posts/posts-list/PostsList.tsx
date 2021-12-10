import React, { ReactElement, useState, useEffect } from "react";
import { observer } from 'mobx-react'

import postsStore from "../../../services/stores/postsStore";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../../services/models/IPost";
import { isUserAuthenticated, getCurrentUserId } from "../../../services/utils/Auth";
import { getUserLikes, saveLikedPost } from "../../../services/utils/Post";

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'
import LikeButton from "../post/LikeButton";

import './style.css'

const PostsListItems: React.FC = (): ReactElement => {
    const navigate = useNavigate();
    const [likes, setLikes] = useState<number[]>()

    useEffect(() => {
        if (isUserAuthenticated()) {
            setLikes(getUserLikes(getCurrentUserId()))
        }
    }, [])

    const likePost = (postId: number) => {
        // like
        if (!likes) {
            setLikes([postId])
            return
        }

        if (!likes.includes(postId)) {
            setLikes([...likes, postId])
            saveLikedPost(getCurrentUserId(), postId)
            return
        }

        // unlike
        let _tempCopy = [...likes];
        let index = _tempCopy.indexOf(postId);

        if (index !== -1) {
            _tempCopy.splice(index, 1);
        }

        setLikes(_tempCopy)
        saveLikedPost(getCurrentUserId(), postId)
    }

    return (
        <div className="posts-container">
            { postsStore.data.map((post: IPost) => (
                <React.Fragment key={post.id}>
                    <Box sx={{ minWidth: 450, maxWidth: 450, marginTop: 4 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.primary">
                                    { post.title }
                                </Typography>
                            </CardContent>
                            <Divider sx={{ maxWidth: 270, margin: 'auto'}}/>
                            <CardActions disableSpacing>
                                <LikeButton postId={post.id} likePost={likePost}  />
                                <Button size="small" sx={{ marginLeft: '55%'}} onClick={() => navigate(`/posts/${post.id}`, { state: { postId: post.id } })}>Читать далее</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </React.Fragment>
            ))
            }
            {
                postsStore.data.length === 0 && <p>No posts or user not found</p>
            }
        </div>
    )
}

const ObservedPostList = observer(PostsListItems);

interface PostListProps {
    page: number,
    sourceURL: string
}

const PostsList: React.FC<PostListProps> = ({page, sourceURL}): ReactElement => {
    useEffect(() => {
        postsStore.load(sourceURL)
    }, [page, sourceURL])
    return (
        <ObservedPostList />
    )
}

export default PostsList
