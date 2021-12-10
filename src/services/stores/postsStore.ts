import { makeAutoObservable } from "mobx";
import { IPost } from "../models/IPost";
import { getPostsPerPage } from '../api/urls';

interface IPostPagination {
    total: number;
    pages: number;
    page: number;
    limit: number;
    links: {
        previous: string | null;
        current: string;
        next: string;
    }
}

interface IPostMeta {
    pagination?: IPostPagination
}

interface IPostsStore {
    meta: IPostMeta,
    data: IPost[],
}

class Posts {
    meta: IPostMeta = {};
    data: IPost[] = [];
    currentUrl: string = '';
    currentSourceUrl: string = getPostsPerPage(1);

    constructor() {
        makeAutoObservable(this);
    }

    setCurrentUrl(newUrl: string) {
        this.currentUrl = newUrl;
    }

    setCurrentSourceUrl(newSource: string) {
        this.currentSourceUrl = newSource;
    }

    load(url: string) {
        fetch(url)
        .then((resp) => resp.json())
        .then((resp: IPostsStore) => {
            postsStore.data = resp.data; postsStore.meta = resp.meta 
        })
    }
}

const postsStore = new Posts();

export default postsStore;
