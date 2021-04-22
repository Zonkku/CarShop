import React, {useState, useEffect} from 'react';

import { AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCar from './components/AddCar'
import EditCar from './components/EditCar'
import Snackbar from '@material-ui/core/Snackbar';

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const openSnackbar = () => {
    setOpen(true);
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchCars();

  }, []);

  const fetchCars = () => [
    fetch ('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.err(err))
  ]

  const deleteCar = (url) => {
    if (window.confirm('Are you sure?')) {
      fetch(url, {method: 'DELETE'})
      .then(response => {
        if(response.ok) {
          openSnackbar();
          fetchCars();


        }
         
        else {

        
          alert('Something went wrong');
        }
      })
      .catch(err => console.error(err))
    }
  }

  const addCar = (newCar) => {
    fetch('https://carstockrest.herokuapp.com/cars', {
      method: 'POST',
      body: JSON.stringify(newCar),
      headers: { 'Content-type' : 'application/json' }
    })
    .then(response => {
      if (response.ok)
        fetchCars();
      else
        alert('Something went wrong');
    })
    .catch(err => console.error(err))
  }

  const editCar = (url, updatedCar) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(updatedCar),
      headers: { 'Content-type' : 'application/json'}
    })
    .then(response => {
      if(response.ok)
        fetchCars();
      else
        alert('Something went wrong');
    })
  .catch(err => console.error(err))
}


  const columns = [
    { field:'brand', sortable: true, filter: true},
    { field:'model', sortable: true, filter: true},
    { field:'color', sortable: true, filter: true},
    { field:'fuel', sortable: true, filter: true},
    { field:'year', sortable: true, filter: true, width: 100},
    { field:'price', sortable: true, filter: true, width: 120},
    {headerName: '',
    field:'_links.self.href',
    width: 100,
    cellRendererFramework: params =>
      <EditCar link={params.value} car={params.data} editCar={editCar} />
    
    },
    { headerName: '',
      field:'_links.self.href',
      width: 100,
      cellRendererFramework: params => 
        <IconButton color="secondary" onClick={() => deleteCar(params.value)}>
          <DeleteIcon /> 
        </IconButton> 
      }

  ]

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            CarShop
          </Typography>
        </Toolbar>
      </AppBar>
      <AddCar addCar={addCar} />
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}
          suppressCellSelecttion={true}

        />
      </div>
      <Snackbar
        open={open}
        message="Car deleted"
        autoHideDuration={3000}
        onClose={closeSnackbar}
        />
        
    </div>
  );
}

export default App;
