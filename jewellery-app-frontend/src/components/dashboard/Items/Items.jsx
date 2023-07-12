import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {Input, InputAdornment, InputBase} from "@mui/material";
import {BiSearch} from "react-icons/bi";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const Items = () =>{
  return(
    <div>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'rows',
            justifyContent: 'space-between',
          }}

        >
          <div style={{
            display: 'flex',
            gap:10
          }}>
            <Button variant="outlined">Primary</Button>
            <Button variant="contained" color="success">Success</Button>
          </div>

          <div style={{
            border: '1px solid #ccc',
            borderRadius:6
          }}>
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
    </div>
  )
}

export default Items
