import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {Backdrop, InputBase} from "@mui/material";
import {BiSearch, BiPlusCircle} from "react-icons/bi";
import IconButton from "@mui/material/IconButton";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Item.css'
import {useEffect, useState} from "react";
import AddItem from "./AddItem/AddItem.jsx";
import {getAllItems} from "../../../services/item.js";

const Items = () => {
  const [openAddItem, setOpenAddItem] = useState(false);
  const [rows, setRows] = useState([]);
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState("");

  const createData = (name, material, description, weight, price, quantity, action) => {
    return {name, material, description, weight, price, quantity, action};
  };

  useEffect(() => {
    const getItems = async () => {
      const items = await getAllItems();
      const mappedRows = items.data.map((item) =>
        createData(
          item.name,
          item.material,
          item.description,
          item.weight,
          item.price,
          item.quantity,
          <Button
            variant="contained"
            size={"small"}
            onClick={() => {
              setItem(item);
              setOpenAddItem(true);
            }}

          >
            View
          <
         /Button>
        ))
      setRows(mappedRows);
    };
    getItems();
  }, []);


  return (
    <div>
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={openAddItem}
      >
        <AddItem onClose={() => setOpenAddItem(false)} item={item}/>
      </Backdrop>

      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2
          }}
          className="TopBar"
        >
          <div style={{
            display: 'flex',
            gap: 10
          }}>
            <Button
              size="small"
              variant="contained"
              color="success"
              endIcon={<BiPlusCircle/>}
              onClick={() => {
                setItem([]);
                setOpenAddItem(true);
              }}
            >
              Add Item
            </Button>
          </div>

          <div className="SearchItem">
            <InputBase
              sx={{ml: 1, flex: 1}}
              placeholder="Search Items"
              inputProps={{'aria-label': 'search items'}}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
              <BiSearch/>
            </IconButton>
          </div>
        </Paper>
      </Grid>

      <TableContainer component={Paper} sx={{mt: 5}}>
        <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}}>Item</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Material</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Weight</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Price</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Quantity</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="center">Description</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.material}</TableCell>
                <TableCell>{row.weight}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="right">{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Items
