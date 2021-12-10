export const getUserLikes = (userId: number): number[] | undefined => {

    if (!userId) {
        return undefined
    }

    const userLikes = localStorage.getItem(userId.toString());

    if (userLikes) {
        return JSON.parse(userLikes);
    }

    return undefined;
}

export const saveLikedPost = (userId: number, postId: number): void => {
    let userLikes = localStorage.getItem(userId.toString());
    let userLikesData = null;

    if (userLikes) {
        // пользователь что-то уже лайкал
        userLikesData = JSON.parse(userLikes);

        if (!userLikesData.includes(postId)) {
            localStorage.setItem(userId.toString(), JSON.stringify([...userLikesData, postId]));
            return
        }

        let _tempCopy = [...userLikesData];
        let index = _tempCopy.indexOf(postId);
        if (index !== -1) {
            _tempCopy.splice(index, 1);
        }
        
        localStorage.setItem(userId.toString(), JSON.stringify([..._tempCopy]));
      
        return 
    }

    // пользователь лайкает впервые
    localStorage.setItem(userId.toString(), JSON.stringify([postId]));
}

export const isPostLiked = (userId: number, postId: number): boolean => {
    const userLikes = getUserLikes(userId)
    if (userLikes && userLikes.includes(postId)) {
        return true
    }
    return false
}

