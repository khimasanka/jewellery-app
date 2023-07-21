import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {GrClose} from "react-icons/gr";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {FaDeleteLeft} from "react-icons/fa6";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {MenuItem} from "@mui/material";
import {saveUser, updateUser} from "../../../../services/customer.js";

const AddCustomer = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (props.customer) {
      setName(props.customer.name || "");
      setAddress(props.customer.address || "");
      setTelephone(props.customer.telephone || "");
      setGender(props.customer.gender || "Male");
    } else {
      setName("");
      setAddress("");
      setTelephone("");
      setGender("Male");
    }
  }, [props.customer]);

  const genderObject = [
    {value: 'Male'},
    {value: 'Female'},
  ];

  const customer = {
    name,
    address,
    telephone,
    gender,
  };

  const updateCustomer = async () => {
    try {
      // eslint-disable-next-line react/prop-types
      await updateUser(props.customer._id,customer);
      // eslint-disable-next-line react/prop-types
      props.onClose();
    }catch (e) {
      console.log(e)
    }
  }

  const addCustomer = async () => {
    try {
      await saveUser(customer);
      // eslint-disable-next-line react/prop-types
      props.onClose();
    }catch (e) {
      console.log(e)
    }
  }

  return (
    <Box className="Container" width={720} m={1}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={11}>
          <Typography align="center" color="black" variant="h6" gutterBottom>
            {/* eslint-disable-next-line react/prop-types */}
            {props.customer._id === undefined ? "Add" : "Edit"} Customer
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size={"small"}
              freeSolo
              id="outlined-start-adornment"
              fullWidth
              placeholder={"Address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size={"small"}
              freeSolo
              id="outlined-start-adornment"
              placeholder={"Phone Number"}
              fullWidth
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              select
              size={"small"}
              freeSolo
              defaultValue="Male"
              fullWidth
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {genderObject.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                {/* eslint-disable-next-line react/prop-types */}
                {props.customer._id === undefined
                  ? <Button color="secondary" variant="outlined">Clear</Button>
                  :
                  <Button color="error" variant="outlined" endIcon={<FaDeleteLeft/>}>Delete</Button>
                }

              </Grid>
              <Grid item>
                {/* eslint-disable-next-line react/prop-types */}
                {props.customer._id === undefined
                  ? <Button color="success" variant="contained" onClick={addCustomer}>Add Customer</Button>
                  :
                  <Button color="secondary" variant="contained" onClick={updateCustomer}>Update</Button>
                }
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default AddCustomer;
