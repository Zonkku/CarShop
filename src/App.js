import React, {useState, useEffect} from 'react';

import { AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();

  }, []);

  const fetchCars = () => [
    fetch ('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.err(err))
  ]

  const columns = [
    { field:'brand', sortable: true, filter: true},
    { field:'model', sortable: true, filter: true},
    { field:'color', sortable: true, filter: true},
    { field:'fuel', sortable: true, filter: true},
    { field:'year', sortable: true, filter: true, width: 100},
    { field:'price', sortable: true, filter: true, width: 120}

  ]

  return (
    <div className="App">
      <Toolbar position="static">
        <AppBar>
          <Typography variant="h6">
            CarShop
          </Typography>
        </AppBar>
      </Toolbar>
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}

        />
      </div>
        
    </div>
  );
}

export default App;
