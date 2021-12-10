export const DOMAIN_URL = 'https://gorest.co.in/public/v1';
export const POSTS_URL = DOMAIN_URL + '/posts/'

export const getPostsPerPage = (page: number) => {
    return DOMAIN_URL + '/posts?page=' + page
}

export const getUsersPostsURL = (userId: number) => {
    return DOMAIN_URL + '/users/' + userId + '/posts'
}