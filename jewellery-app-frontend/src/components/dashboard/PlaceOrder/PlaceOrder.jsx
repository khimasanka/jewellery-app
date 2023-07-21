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

const PlaceOrder  = () => {
  const top100Films = ['neckless', 'rings', 'earrings', 'bracelets', 'watches'];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  ];

  return (
    <Container>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} rowSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            disablePortal
            size={"small"}
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Item" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            disablePortal
            size={"small"}
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Material" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Weight" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Quantity" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Customer" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Address" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Contact" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            size={"small"}
            disablePortal
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Gender" />}
          />
        </Grid>

        <Grid container spacing={2} justifyContent="space-between" my={2}>
          <Grid item>
            Price : <span>$100</span>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained">Add Item</Button>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
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

      <Grid container justifyContent={"flex-end"} my={3}>
        <Button color="success" variant="contained">Place Order</Button>
      </Grid>
    </Container>
  )
}

export default PlaceOrder;
