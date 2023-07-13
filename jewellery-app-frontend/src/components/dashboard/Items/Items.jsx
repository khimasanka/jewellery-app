import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {Backdrop, InputBase} from "@mui/material";
import {BiSearch,BiPlusCircle} from "react-icons/bi";
import IconButton from "@mui/material/IconButton";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Item.css'
import {useState} from "react";
import AddItem from "./AddItem/AddItem.jsx";

const Items = () =>{
  const [openAddItem, setOpenAddItem] = useState(false);

  const createData = (name, calories, fat, carbs, protein) => {
    return {name, calories, fat, carbs, protein};
  };

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return(
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAddItem}
       // onClick={()=>setOpenAddItem(false)}
      >
        <AddItem onClose={()=>setOpenAddItem(false)}/>
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
            gap:10
          }}>
            <Button variant="outlined" size="small">View Items</Button>
            <Button size="small" variant="contained" color="success" endIcon={<BiPlusCircle/>} onClick={()=>setOpenAddItem(true)}>Add Item</Button>
          </div>

          <div className="SearchItem">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Items"
              inputProps={{ 'aria-label': 'search items' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <BiSearch />
            </IconButton>
          </div>
        </Paper>
      </Grid>

      <TableContainer component={Paper} sx={{mt:5}}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:'bold'}}>Dessert (100g serving)</TableCell>
              <TableCell sx={{fontWeight:'bold'}} align="right">Calories</TableCell>
              <TableCell sx={{fontWeight:'bold'}} align="right">Fat&nbsp;(g)</TableCell>
              <TableCell sx={{fontWeight:'bold'}} align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell sx={{fontWeight:'bold'}} align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Items
