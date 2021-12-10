import axios from "axios";
import { BEARER_TOKEN } from "./token";
import { POSTS_URL } from '../api/urls'
import { IPost } from "../models/IPost";

export const publishPost = async (post: IPost): Promise<number> => {
    const config = {
        headers: { Authorization: BEARER_TOKEN }
    }
    
    return axios.post(POSTS_URL, post, config)
        .then(function (response) {
            alert('Успешный успех!')
            return response.data.data.id
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getPostById = (id: string): Promise<IPost> => {
    return axios.get(POSTS_URL + id)
        .then(function(resp) {
            return resp.data.data
        })
        .catch(function (error) {
            console.error(error);
        });
}