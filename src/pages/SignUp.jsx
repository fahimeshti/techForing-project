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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import dayjs from 'dayjs';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const theme = createTheme();

export default function SignUp() {
    const [value, setValue] = useState(dayjs(new Date()));

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            full_name: data.get('full_name'),
            email: data.get('email'),
            password: data.get('password'),
            birthDate: data.get('birthDate'),
            phone_number: data.get('phone_number'),
            gender: data.get('gender'),
        };
        try {
            await axios.post('https://tf-practical.herokuapp.com/api/register/', userData);
            window.location = '/login'
        } catch (err) { console.log(err) }
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <div className='center-item' style={{
            width: "100vw",
            minHeight: "100vh",
            background: "#EFF3F6",
          }}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" >
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
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="full-name"
                                        name="full_name"
                                        required
                                        fullWidth
                                        id="full_name"
                                        label="Full Name"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Date of Birth"
                                            inputFormat="YYYY-MM-DD"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField name="last-date" fullWidth sx={{ mt: 0 }} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <FormControl fullWidth sx={{ mt: 1, pl: 1 }}>
                                    <InputLabel id="demo-simple-gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-gender-label"
                                        id="demo-simple-gender"
                                        name="gender"
                                        label="Choose Gender"
                                        defaultValue='Male'
                                    >
                                        <MenuItem value='Male'>Male</MenuItem>
                                        <MenuItem value='Female'>Female</MenuItem>
                                        <MenuItem value='Other'>Other</MenuItem>
                                    </Select>
                                </FormControl>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="phone"
                                        label="Phone number"
                                        name="phone_number"
                                        autoComplete="phone"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
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
