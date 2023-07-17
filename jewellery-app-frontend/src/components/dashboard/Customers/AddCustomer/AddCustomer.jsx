import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {GrClose} from "react-icons/gr";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {Autocomplete, InputAdornment, MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Button from "@mui/material/Button";

const AddCustomer = (props) => {
  const gender = [
    {
      value: 'Male',
    },
    {
      value: 'Female',
    },
  ];


  return (
    <Box className="Container" width={720} m={1}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={11}>
          <Typography align="center" color="black" variant="h6" gutterBottom>
            Add Customer
          </Typography>
        </Grid>
        <Grid item xs={1} textAlign="end" paddingRight={1}>
          {/* eslint-disable-next-line react/prop-types */}
          <GrClose color="black" onClick={props.onClose} cursor="pointer"/>
        </Grid>
      </Grid>
      <Container sx={{mt: 2}}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size={"small"}
              freeSolo
              id="outlined-start-adornment"
              placeholder={"Customer Name"}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size={"small"}
              freeSolo
              id="outlined-start-adornment"
              fullWidth
              placeholder={"Address"}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size={"small"}
              freeSolo
              id="outlined-start-adornment"
              placeholder={"Phone Number"}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              select
              size={"small"}
              freeSolo
              defaultValue="Male"
              fullWidth
            >
              {gender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                <Button color="secondary" variant="outlined">Clear</Button>
              </Grid>
              <Grid item>
                <Button color="secondary" variant="contained">Add Customer</Button>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default AddCustomer;
