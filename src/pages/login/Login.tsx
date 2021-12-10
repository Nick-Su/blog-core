import React, { ReactElement, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from '../../components/app-bar/AppBar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Login: React.FC = (): ReactElement => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: any): void => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: any): void => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any): void => {
        setPassword(event.target.value);
    };

    const handleLogin = (): void => {
        if (!username || !email || !password) {
            alert('Заполните все поля!')
            return
        }

        const user = {
            userId: null,
            username,
            email,
            password
        }

        // check if already logged in
        let rawUserSessionData = sessionStorage.getItem('userSessionData');
        let userSessionData = null;

        if (rawUserSessionData) {
            userSessionData = JSON.parse(rawUserSessionData);
        }

        if (userSessionData && (userSessionData?.username === username || userSessionData.email === email)) {
            alert('Вы уже авторизованы!')
            return
        }

        let rawUserData = localStorage.getItem('userData');
        let userData = null;

        if (rawUserData) {
            userData = JSON.parse(rawUserData);
        }

        if (userData && (userData?.username === username || userData.email === email)) {
            user.userId = userData.userId; 
            sessionStorage.setItem('userSessionData', JSON.stringify(user));
            navigate("/posts?page=1")
            return
        }

        return
    }
    
    return (
        <>
            <ResponsiveAppBar />
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
               <TextField
                    id="outlined-name"
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    id="outlined-name"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    id="outlined-name"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button variant="contained" onClick={handleLogin}>Войти</Button>
            </Box>
        </>
    )
}

export default Login
