import React, { ReactElement, useState, useEffect } from 'react';
import { observer } from 'mobx-react'
import PostsList from '../../components/posts/posts-list/PostsList';
import postsStore from '../../services/stores/postsStore';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../../components/app-bar/AppBar';
import FilterSideBar from '../../components/posts/filter-menu/FilterSideBar';
import { getUsersPostsURL } from '../../services/api/urls';
import { getPostsPerPage } from '../../services/api/urls';

import './style.css'

const Posts: React.FC = (): ReactElement => {
    const [page, setPage] = useState<number>(1);
    const [sourceUrl, setSourceUrl] = useState(postsStore.currentSourceUrl);

    let pages = postsStore.meta.pagination?.pages;

    useEffect(() => {
        setSourceUrl(postsStore.currentSourceUrl)
    }, [postsStore.currentSourceUrl])

    const handlePaginationClick = (event: any, value: number) => {
        setPage(value)
        setSourceUrl(getPostsPerPage(value))
    }

    const handleFilterSubmit = (userId: number | undefined) => {
        if (userId) {
            setSourceUrl(getUsersPostsURL(userId));
            postsStore.setCurrentUrl(getUsersPostsURL(userId));
            postsStore.setCurrentSourceUrl(getUsersPostsURL(userId));
        }
    }

    return (
        <div className="centred-container">
            <h1>Posts</h1>
            <Pagination count={pages} page={page} onChange={handlePaginationClick} color="primary" />
            <Box sx={{paddingBottom: 6}} className='posts'>
                <PostsList page={page} sourceURL={sourceUrl} />
                <FilterSideBar onFilterSubmit={handleFilterSubmit} />  
            </Box>
            <Pagination count={pages} page={page} onChange={handlePaginationClick} color="primary" />
        </div>
    )
}

const ObservedPosts = observer(Posts);

function PostsOverview() {
    return (
        <>
            <ResponsiveAppBar />
            <ObservedPosts />
        </>
    )
}

export default PostsOverview
