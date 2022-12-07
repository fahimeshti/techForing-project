import OutlinedCard from "../components/Card";
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Alert, Grid, Typography } from "@mui/material";
import DUMMY_DATA from '../data/jobs.json';


function Home() {
  const [jobs, setJobs] = useState([]);
  const [alert, setAlert] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // get user from localStorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'));
    setToken(items?.access);
  }, [])

  const getAllJobs = async () => {
    try {
      // const res = await axios.get('https://tf-practical.herokuapp.com/api/job_post/', {
      //   headers: { Authorization: `Bearer ${token}` }
      // })
      // setJobs(res?.data);
      setJobs(DUMMY_DATA);
    } catch (err) { console.log(err) }
  };

  useEffect(() => {
    token?.length > 0 && getAllJobs();
  }, [token])

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`https://tf-practical.herokuapp.com/api/job_update/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // setAlert(true);
      // getAllJobs();

      // dummy code
      const newJobs = jobs?.filter(job => job.id !== id);
      setJobs(newJobs);
      setAlert(true);
    } catch (err) { console.log(err) }
  }

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate(0);
  }

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }, [alert])


  return (
    <div style={{
      width: "100vw",
      minHeight: "100vh",
      background: "#EFF3F6",
    }}>
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>

        <button className="btn" onClick={handleLogOut} style={{ borderRadius: "5px",border:"2px solid #000" }}>
          Logout
        </button>

      </div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{ p: 3 }}
      >
        {
          jobs?.map(job =>
            <Grid key={job.id} item xs={4}>
              <OutlinedCard
                job={job}
                handleDelete={handleDelete}
              />
            </Grid>
          )
        }
        {
          !(jobs?.length > 0) &&
          <Typography variant="h6" component="div">
            Refresh to get the jobs back.
          </Typography>
        }
      </Grid>
      <Link to='/add-job'>
        <div className="add-job-icon">
          Add job <AddIcon />
        </div>
      </Link>
      {
        alert &&
        <Alert severity="success" sx={{
          mb: 3,
          position: "fixed",
          bottom: "60px",
          right: "30px",
          pr: 3
        }}>
          Job deleted
        </Alert>
      }
    </div>
  )
}

export default Home;

