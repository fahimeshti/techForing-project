import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { redirect } from 'react-router-dom';
const theme = createTheme();


export default function SignIn() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        };
        try {
            // const res = await axios.post('https://tf-practical.herokuapp.com/api/login/', userData)
            // const access = res?.data;
            // const user = res?.user;
            // const newUserData = { ...access, ...user }
            // localStorage.setItem('user', JSON.stringify(newUserData));
            localStorage.setItem('user', JSON.stringify({ access: '12345' })); // setting dummy data
            window.dispatchEvent(new Event("storage"));
            redirect("/")
        } catch (err) { console.log(err) }
    };

    return (
        <div className='center-item' style={{
            width: "100vw",
            minHeight: "100vh",
            background: "#EFF3F6",
          }}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: "#fff",
                            p: 3,
                            borderRadius: "10px",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                sx={{ m: 0 }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                sx={{ m: 0, mt: 1 }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link href="/sign-up" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}