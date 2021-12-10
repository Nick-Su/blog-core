import { makeAutoObservable } from 'mobx'

class UserSession {
    userId: number | undefined = undefined;
    isLoggedIn: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isSessionActive() {
        return this.isLoggedIn
    }

    setIsLoggedIn(value: boolean) {
        this.isLoggedIn = value;
    }
}

const userSessionStore = new UserSession();

export default userSessionStore;
