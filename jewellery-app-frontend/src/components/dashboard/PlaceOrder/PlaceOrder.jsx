import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useEffect, useState} from "react";
import {getAllItems} from "../../../services/item.js";
import {getAllUsers} from "../../../services/customer.js";

const PlaceOrder  = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [filteredWeights, setFilteredWeights] = useState([]);
  const [filteredQuantities, setFilteredQuantities] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [buyQty, setBuyQty] = useState();
  const [rows, setRows] = useState([]);
  const [price, setPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleItemChange = (event, value) => {
    setSelectedItem(value);
    const materials = items.filter((item) => item.name === value).map((item) => item.material);
    setFilteredMaterials([...new Set(materials)]);
    setSelectedMaterial(null);
    setSelectedWeight(null);
    setSelectedQuantity(null);
  };

  const handleMaterialChange = (event, value) => {
    setSelectedMaterial(value);
    const weights = items.filter((item) => item.name === selectedItem && item.material === value).map((item) => item.weight);
    setFilteredWeights([...new Set(weights)]);
    setSelectedWeight(null);
    setSelectedQuantity(null);
  };

  const handleWeightChange = (event, value) => {
    setSelectedWeight(value);
    const quantities = items.filter((item) => item.name === selectedItem && item.material === selectedMaterial && item.weight === value).map((item) => item.quantity);
    setFilteredQuantities([...new Set(quantities)]);
    setSelectedQuantity(null);
  };

  const handleQuantityChange = (event, value) => {
    setSelectedQuantity(value);
    const selectedItemObj = items.find(
      (item) =>
        item.name === selectedItem &&
        item.material === selectedMaterial &&
        item.weight === selectedWeight &&
        item.quantity === value
    );

    if (selectedItemObj) {
      setPrice(selectedItemObj.price);
    } else {
      setPrice(null);
    }
  };


  const itemNames = [...new Set(items.map((item) => item.name))];
  const customerNames = [...new Set(users.map((customer) => customer.name))];


  function createData(itemName, weight, customer, qty, price, action) {
    return {itemName, weight, customer, qty, price, action};
  }


  const handleCustomerChange = (event, value) => {
    setSelectedCustomer(value);
    const addresses = users.filter((customer) => customer.name === value).map((customer) => customer.address);
    setFilteredAddresses([...new Set(addresses)]);
    const contacts = users.filter((customer) => customer.name === value).map((customer) => customer.telephone);
    setFilteredContacts([...new Set(contacts)]);
  };

  useEffect(() => {
    const getDashboardData = async () => {
      const items = await getAllItems();
      const customers = await getAllUsers()
      setItems(items.data);
      setUsers(customers.data);
    }
    getDashboardData();
  }, []);

  const handleAddItem = () => {
    if (selectedItem &&selectedMaterial && selectedWeight && selectedCustomer && buyQty) {
      if (parseInt(buyQty) <= parseInt(selectedQuantity)) {
        const calculatedPrice = parseInt(buyQty) * price;
        const newRow = createData(
          selectedMaterial + " " + selectedItem,
          selectedWeight,
          selectedCustomer,
          buyQty,
          calculatedPrice,
          <Button
            variant="contained"
            color="error"
            size={"small"}
          >
            Remove
          <
         /Button>
        );
        setRows([...rows, newRow]);

        setSelectedItem(null);
        setSelectedMaterial(null);
        setSelectedWeight(null);
        setSelectedQuantity(null);
        setSelectedCustomer(null);
        setBuyQty("");

      } else {
        alert("Buy quantity cannot be more than the available quantity.");
      }
    }
  };

  const calculateTotalPrice = (dataRows) => {
    let total = 0;
    dataRows.forEach((row) => {
      total += row.price;
    });
    return total;
  };

  useEffect(() => {
    const total = calculateTotalPrice(rows);
    setTotalPrice(total);
  }, [rows]);

  return (
    <Container>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} rowSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            disablePortal
            size={"small"}
            options={itemNames}
            value={selectedItem}
            getOptionLabel={(option) => option}
            onChange={handleItemChange}
            renderInput={(params) => <TextField {...params} label="Item" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            disablePortal
            size={"small"}
            options={filteredMaterials}
            value={selectedMaterial}
            onChange={handleMaterialChange}
            renderInput={(params) => <TextField {...params} label="Material" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={filteredWeights}
            value={selectedWeight}
            onChange={handleWeightChange}
            renderInput={(params) => <TextField {...params} label="Weight" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={filteredQuantities}
            value={selectedQuantity}
            onChange={handleQuantityChange}
            renderInput={(params) => <TextField {...params} label="Quantity" />}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={customerNames}
            value={selectedCustomer}
            onChange={handleCustomerChange}
            renderInput={(params) => <TextField {...params} label="Customer" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={filteredAddresses}
            value={filteredAddresses}
            renderInput={(params) => <TextField {...params} label="Address" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={filteredContacts}
            value={filteredContacts}
            renderInput={(params) => <TextField {...params} label="Contact" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            size={"small"}
            disablePortal
            value={buyQty}
            onChange={(e) => setBuyQty(e.target.value)}
            fullWidth
            label={"Buy Qty"}
          />
        </Grid>

        <Grid container spacing={2} justifyContent="space-between" my={2}>
          <Grid item>
            Price : <span>{totalPrice}</span>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained" onClick={handleAddItem}>Add Item</Button>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Customer</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.itemName}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.customer}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent={"flex-end"} my={3}>
        <Button color="success" variant="contained">Place Order</Button>
      </Grid>
    </Container>
  )
}

export default PlaceOrder;
