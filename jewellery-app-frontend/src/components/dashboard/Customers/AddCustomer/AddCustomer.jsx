import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Snackbar} from "@mui/material";
import {GrClose} from "react-icons/gr";
import {FaDeleteLeft} from "react-icons/fa6";
import {AiFillCloseCircle} from "react-icons/ai";
import MuiAlert from "@mui/material/Alert";
import {deleteUser, saveUser, updateUser} from "../../../../services/customer.js";
import IconButton from "@mui/material/IconButton";
import DialogPopup from "../../Dialog/Dialog";

const AddCustomer = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [gender, setGender] = useState("Male");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState(false);

  useEffect(() => {
    if (props.customer) {
      const {name, address, telephone, gender} = props.customer;
      setName(name || "");
      setAddress(address || "");
      setTelephone(telephone || "");
      setGender(gender || "Male");
    } else {
      setName("");
      setAddress("");
      setTelephone("");
      setGender("Male");
    }
  }, [props.customer]);

  const genderOptions = ["Male", "Female"];

  const customer = {
    name,
    address,
    telephone,
    gender,
  };

  const updateCustomer = async () => {
    try {
      await updateUser(props.customer?._id, customer);
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const addCustomer = async () => {
    if (formIsValid()) {
      try {
        await saveUser(customer);
        props.onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const formIsValid = () => {
    if (name === "") {
      showMessage("Customer name is required", "warning");
      return false;
    } else if (address === "") {
      showMessage("Address is required", "warning");
      return false;
    }
    return true;
  };

  const showMessage = (message, severity) => {
    setMessage(message);
    setAlertSeverity(severity);
    setSnackbarOpen(true);
  };

  const onDeleteCustomer = async () => {
    try {
      await deleteUser(props.customer?._id);
      setDialogOpen(false);
      props.onClose();
    } catch (e) {
      showMessage("Something went wrong", "warning");
      console.log(e)
    }
  }

  return (
    <Box className="Container" width={720} m={1}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        onClose={() => setSnackbarOpen(false)}
        action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
          <AiFillCloseCircle fontSize="small"/>
        </IconButton>
      }
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={alertSeverity} sx={{width: "100%"}}>
          {message}
        </Alert>
      </Snackbar>
      <DialogPopup
        dialogOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={"Delete Customer"}
        description={"Are you sure you want to delete this customer?"}
        onClickLeftButton={onDeleteCustomer}
        onClickRightButton={() => setDialogOpen(false)}
        LeftButtonText={"Yes, delete"}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={11}>
          <Typography align="center" color="black" variant="h6" gutterBottom>
            {props.customer?._id === undefined ? "Add" : "Edit"} Customer
          </Typography>
        </Grid>
        <Grid item xs={1} textAlign="end" paddingRight={1}>
          <GrClose color="black" onClick={props.onClose} cursor="pointer"/>
        </Grid>
      </Grid>
      <Container sx={{mt: 2}}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size="small"
              id="outlined-start-adornment"
              placeholder="Customer Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size="small"
              id="outlined-start-adornment"
              fullWidth
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size="small"
              id="outlined-start-adornment"
              placeholder="Phone Number"
              fullWidth
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              select
              size="small"
              fullWidth
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                {props.customer?._id === undefined ? (
                  <Button color="secondary" variant="outlined">
                    Clear
                  </Button>
                ) : (
                  <Button
                    color="error"
                    variant="outlined"
                    endIcon={<FaDeleteLeft/>}
                    onClick={() => setDialogOpen(true)}
                  >
                    Delete
                  </Button>
                )}
              </Grid>
              <Grid item>
                {props.customer?._id === undefined ? (
                  <Button color="success" variant="contained" onClick={addCustomer}>
                    Add Customer
                  </Button>
                ) : (
                  <Button color="secondary" variant="contained" onClick={updateCustomer}>
                    Update
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddCustomer;
