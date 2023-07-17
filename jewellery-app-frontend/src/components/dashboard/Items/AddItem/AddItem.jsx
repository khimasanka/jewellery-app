import './AddItem.css';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {GrClose} from "react-icons/gr";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Button from "@mui/material/Button";

const AddItem = (props) => {
  const itemNames = [
    'Necklace',
    'Bracelet',
    'Earrings',
    'Ring',
    'Pendant',
    'Brooch',
    'Anklet',
    'Choker',
    'Bangle',
    'Cufflinks',
    'Tiara',
    'Nose Ring',
    'Belly Button Ring',
    'Toe Ring',
    'Hairpin'
  ];

  const materials = [
    'Gold',
    'Silver',
    'Diamond',
    'Stainless Steel',
    'Crystal',
    'Pearl',
    'Copper'
  ]

  const [inputNameValue, setInputNameValue] = useState('');
  const [itemName, setItemName] = useState(itemNames[0]);

  return (
    <Box className="Container" width={720} m={1}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={11}>
          <Typography align="center" color="black" variant="h6" gutterBottom>
            Add Item
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
            <Autocomplete
              freeSolo
              size={"small"}
              value={itemName}
              onChange={(event, newValue) => {
                setItemName(newValue);
              }}
              inputValue={inputNameValue}
              onInputChange={(event, newInputValue) => {
                setInputNameValue(newInputValue);
              }}
              options={itemNames.map((option) => option)}
              renderInput={(params) => <TextField {...params} label="Item Name" />}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Autocomplete
              size={"small"}
              freeSolo
              value={itemName}
              onChange={(event, newValue) => {
                setItemName(newValue);
              }}
              inputValue={inputNameValue}
              onInputChange={(event, newInputValue) => {
                setInputNameValue(newInputValue);
              }}
              options={materials.map((option) => option)}
              renderInput={(params) => <TextField {...params} label="Material" />}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Autocomplete
              freeSolo
              size={"small"}
              value={itemName}
              onChange={(event, newValue) => {
                setItemName(newValue);
              }}
              inputValue={inputNameValue}
              onInputChange={(event, newInputValue) => {
                setInputNameValue(newInputValue);
              }}
              options={itemNames.map((option) => option)}
              renderInput={(params) => <TextField {...params} label="Weight" />}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Autocomplete
              size={"small"}
              freeSolo
              value={itemName}
              onChange={(event, newValue) => {
                setItemName(newValue);
              }}
              inputValue={inputNameValue}
              onInputChange={(event, newInputValue) => {
                setInputNameValue(newInputValue);
              }}
              options={materials.map((option) => option)}
              renderInput={(params) => <TextField {...params} label="Price" />}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                <Button color="secondary" variant="outlined">Clear</Button>
              </Grid>
              <Grid item>
                <Button color="secondary" variant="contained">Add Item</Button>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default AddItem;
