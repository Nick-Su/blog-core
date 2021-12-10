import React, { useEffect, useState, ReactElement } from 'react'
import { observe } from 'mobx'
import userSessionStore from '../../../services/stores/userSessionStore';

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { isUserAuthenticated, getCurrentUserId } from '../../../services/utils/Auth'
import { isPostLiked } from '../../../services/utils/Post';

interface LikeButtonProps {
    postId: number;
    likePost: (postId: number) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, likePost }): ReactElement => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isBtnLiked, setIsBtnLiked] = useState<boolean>(false);

    useEffect(() => {
        setIsBtnLiked(isPostLiked(getCurrentUserId(), postId))
        setIsLoggedIn(isUserAuthenticated())
    }, [postId])

    observe(userSessionStore, 'isLoggedIn', change => {
        setIsLoggedIn(!!(change.newValue))
    })

    const handleLikeClick = (): void => {
        setIsBtnLiked(!isBtnLiked)
        likePost(postId)
    }

    return (
        <IconButton aria-label="add to favorites" onClick={handleLikeClick} >
            { isLoggedIn && <FavoriteIcon className={isBtnLiked ? 'red' : undefined} /> }
        </IconButton>
    )
}

export default LikeButton;
