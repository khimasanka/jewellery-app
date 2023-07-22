import './AddItem.css';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {GrClose} from "react-icons/gr";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {Autocomplete, InputAdornment} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {FaDeleteLeft} from "react-icons/fa6";
import {saveItem, updateItem} from "../../../../services/item.js";

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
  const [inputMaterialValue, setInputMaterialValue] = useState('');
  const [material, setMaterial] = useState(materials[0]);
  const [weight, setWeight] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    if (props.item) {
      const {name, material, weight, price, description, quantity} = props.item;
      setItemName(name || "");
      setMaterial(material || "");
      setWeight(weight || "");
      setPrice(price || "");
      setDescription(description || "");
      setQuantity(quantity || "");
    }
  }, [props.item]);

  const item ={
    name: inputNameValue,
    material:inputMaterialValue,
    description,
    weight,
    price,
    quantity
  }

  const onSaveItem = async () => {
    try {
      await saveItem(item);
      props.onClose();
    } catch (e) {
      console.log(e)
    }
  };

  const onUpdateItem = async () => {
    try {
      await updateItem(props.item._id, item);
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
            {props.item?._id === undefined ? "Add" : "Edit"} Item
          </Typography>
        </Grid>
        <Grid item xs={1} textAlign="end" paddingRight={1}>
          <GrClose color="black" onClick={props.onClose} cursor="pointer"/>
        </Grid>
      </Grid>
      <Container sx={{mt: 2}}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={12}>
            <Autocomplete
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
              renderInput={(params) => <TextField {...params} label="Item Name"/>}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Autocomplete
              size={"small"}
              value={material}
              onChange={(event, newValue) => {
                setMaterial(newValue);
              }}
              inputValue={inputMaterialValue}
              onInputChange={(event, newInputValue) => {
                setInputMaterialValue(newInputValue);
              }}
              options={materials.map((option) => option)}
              renderInput={(params) => <TextField {...params} label="Material"/>}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size={"small"}
              id="outlined-start-adornment"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Weight</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">mg</InputAdornment>
                ),
              }}
              value={weight}
              onChange={e=>setWeight(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size={"small"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Price</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">rs</InputAdornment>
                ),
              }}
              value={price}
              onChange={e=>setPrice(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size={"small"}
              fullWidth
              placeholder="Description"
              value={description}
              onChange={e=>setDescription(e.target.value)}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <TextField
              size={"small"}
              placeholder="Quantity"
              type="number"
              fullWidth
              value={quantity}
              onChange={e=>setQuantity(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                {props.item?._id === undefined ? (
                  <Button color="secondary" variant="outlined">Clear</Button>
                ) : (
                  <Button
                    color="error"
                    variant="outlined"
                    endIcon={<FaDeleteLeft/>}
                    //onClick={() => setDialogOpen(true)}
                  >
                    Delete
                  </Button>
                )}

              </Grid>
              <Grid item>
                {props.item?._id === undefined ? (
                    <Button color="success" variant="contained" onClick={onSaveItem}>Add Item</Button>)
                  : (
                    <Button color="secondary" variant="contained" onClick={onUpdateItem}>
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
}

export default AddItem;
