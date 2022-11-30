import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function OutlinedCard({ job, handleDelete }) {
    return (
        <Box sx={{ minWidth: 200, m: 1 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {job.jobTitle}
                    </Typography>
                    <Typography variant="body1">
                        Last date of apply: {job.lastDateOfApply}
                    </Typography>
                    <Typography variant="body1">
                        Level: {job.level}
                    </Typography>
                    <Typography variant="body1">
                        Shift: {job.shift}
                    </Typography>
                    <Typography variant="body1">
                        Vacancies: {job.vacancies}
                    </Typography>
                    <Typography variant="body1">
                        Job Type: {job.jobType}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        Job Description:{' '}
                        {job.jobDescription}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    p: 2
                }}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(job.id)}
                    >
                        Delete Job
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
