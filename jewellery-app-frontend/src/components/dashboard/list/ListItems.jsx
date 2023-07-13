import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {RxDashboard} from 'react-icons/rx';
import {GiPearlNecklace} from 'react-icons/gi';
import {MdPeople} from 'react-icons/md';
import {RiBarChart2Fill} from 'react-icons/ri';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <RxDashboard />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/items">
      <ListItemIcon>
        <GiPearlNecklace />
      </ListItemIcon>
      <ListItemText primary="Items" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MdPeople />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <RiBarChart2Fill />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
  </React.Fragment>
);
