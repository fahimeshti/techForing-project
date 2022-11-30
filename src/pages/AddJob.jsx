import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import axios from 'axios';
import { useNavigate } from 'react-router'
import { useEffect } from 'react';
const theme = createTheme();



function AddJob() {
    const [value, setValue] = useState(dayjs(new Date()));
    const [successState, setSuccessState] = useState(false);
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    // get user from localStorage
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        setToken(items?.access);
    }, [])

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            jobTitle: data.get('job-title'),
            lastDateOfApply: data.get('last-date'),
            level: data.get('level'),
            shift: data.get('shift'),
            location: data.get('location'),
            vacancies: Number(data.get('vacancies')),
            jobType: data.get('jobType'),
            jobDescription: data.get('jobDescription'),
        }
        console.log(formData);
        try {
            await axios.post('https://tf-practical.herokuapp.com/api/job_post/', formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setSuccessState(true)
            navigate(0);
        } catch (err) { console.log(err) }
    };

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Add Job
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="job-title"
                                label="Job Title"
                                name="job-title"
                                autoComplete="job-title"
                                sx={{ m: 0 }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Last Date Of Apply"
                                    inputFormat="YYYY-MM-DD"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField name="last-date" fullWidth sx={{ mt: 1 }} {...params} />}
                                />
                            </LocalizationProvider>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="level"
                                label="Level"
                                id="level"
                                autoComplete="current-level"
                                sx={{ m: 0, mt: 1 }}
                            />
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="demo-simple-select-label">Shift</InputLabel>
                                <Select
                                    labelId="demo-simple-shift-label"
                                    id="demo-simple-shift"
                                    name="shift"
                                    label="Shift"
                                    defaultValue={''}
                                >
                                    <MenuItem value={'day'}>Day</MenuItem>
                                    <MenuItem value={'night'}>Night</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="location"
                                label="Location"
                                id="Location"
                                autoComplete="current-Location"
                                sx={{ m: 0, mt: 1 }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="vacancies"
                                label="Vacancies"
                                type='number'
                                id="Vacancies"
                                autoComplete="current-Vacancies"
                                sx={{ m: 0, mt: 1 }}
                            />
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="jobType"
                                    label="Job Type"
                                    defaultValue={''}
                                >
                                    <MenuItem value={'part_time'}>Part Time</MenuItem>
                                    <MenuItem value={'full_time'}>Full Time</MenuItem>
                                    <MenuItem value={'internship'}>Internship</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                sx={{ mt: 1 }}
                                fullWidth
                                id="outlined-multiline-static"
                                label="Job Description"
                                name='jobDescription'
                                multiline
                                rows={4}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Add Job
                            </Button>
                        </Box>
                    </Box>
                    {successState && <Alert severity="success" sx={{
                        mb: 3, position: "fixed", bottom: "30px", right: "30px", pr: 3
                    }}>Add job successful!</Alert>}
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default AddJob