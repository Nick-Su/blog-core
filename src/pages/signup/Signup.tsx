import React, { ReactElement, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from '../../components/app-bar/AppBar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Signup: React.FC = (): ReactElement => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSignup = () => {
        
        if (!username || !email || !password) {
            alert('Заполните все поля!')
            return
        }

        const user = {
            userId: Math.floor(Math.random()*1000000),
            username,
            email,
            password
        }

        // check if already signed up
        let rawUserData = localStorage.getItem('userData');
        let userData = null;

        if (rawUserData) {
            userData = JSON.parse(rawUserData);
        }

        if (userData && (userData?.username === username || userData.email === email)) {
            alert('Пользователь с текущим именем и/или почтой уже существуют!')
            return
        }

        localStorage.setItem('userData', JSON.stringify(user));

        navigate("/posts?page=1") 
    }

    return (
        <>
            <ResponsiveAppBar />
            <div className="centred-container">
                <h2>Регистрация</h2>
                <Box
                    component="form"
                    sx={{ minWidth: 400,
                        '& > :not(style)': { m: 1, width: '2' },
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
                    <Button variant="contained" onClick={handleSignup}>Зарегистрироваться</Button>
                </Box>
            </div>
        </>
    )
}

export default Signup
