import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function EditCar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: ''
  })

  const handleClickOpen = () => {
    
    setCar({
        brand: props.car.brand,
        model: props.car.model,
        color: props.car.color,
        fuel: props.car.fuel,
        year: props.car.year,
        price: props.car.price
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.editCar(props.link, car);
    setOpen(false);
  }

  const inputChanged = (event) => {
    setCar({...car, [event.target.name] : event.target.value});
  }

  return (
    <div>

      <IconButton color="primary" onClick={handleClickOpen}>
          <EditIcon /> 
        </IconButton> 
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Car</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Brand"
            name="brand"
            value={car.brand}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Model"
            name="model"
            value={car.model}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Color"
            name="color"
            value={car.color}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Fuel"
            name="fuel"
            value={car.fuel}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Year"
            name="year"
            value={car.year}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            value={car.price}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCar;