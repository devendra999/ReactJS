import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';


const Students = () => {
    const [student, setStudent] = useState();
    const [search, setSearch] = useState([]);

    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
        setStudent(response.data)
    });




  return (
    <>
        <Box>
            <input type="text" value={search} name='search' onChange={(e) => setSearch(e.target.value)} />
        </Box>
            <Grid container spacing={2} style={{ margin: 0 }}>
                      {
                          student &&

                        student.filter((e) => {
                            if (search.length === 0) {
                                return e;
                            } else {
                                const res = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.phone.toLowerCase().includes(search.toLowerCase());
                                return res
                            }
                        }) 
      

                        .map((e, i) => {
                                    return <Grid item xs={3} key={i}> 
                                    
                                    <Card fullwidth="true">
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {e.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {e.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {e.phone}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {e.gender}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" variant='contained'>Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                          })
                      }
            </Grid>
              
    </>
  )
}

export default Students