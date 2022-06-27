import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useFormik, Form, Formik } from "formik";
import { DataGrid } from "@mui/x-data-grid";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    price: yup
      .number('Please enter valid price')
      .required("Please enter price")
      .positive("price cant be in negative"),
    expiry: yup.string().required("Please enter expiry"),
    quantity: yup.string().required("Please enter quantity"),
  });


  //to local storage
  const toStorage = (values) =>{
    const localData = JSON.parse(localStorage.getItem('medicine'));

    const id = Math.floor(Math.random()*1000);
    
    let withIdData = {
      id: id,
      ...values
    }
    console.log(withIdData);
    
    if (localData === null) {
      localStorage.setItem('medicine', JSON.stringify([values]))
    } else {
      localData.push(values)
      localStorage.setItem('medicine', JSON.stringify(localData))
    }
  }
  
// table
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "price", headerName: "Name", width: 130 },
  { field: "expiry", headerName: "Expiry", width: 130 },
  { field: "quantity", headerName: "Quantity", width: 130 },
  
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

  const formik = useFormik({
    initialValues: {
        name: "",
        price: "",
        expiry: "",
        quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      toStorage(values)
    },
  });
  const { handleSubmit, handleChange, errors, handleBlur, touched } = formik;
  return (
    <div>
      <h1>Medicine</h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        List medicine
      </Button>
      <div style={{ height: 400, width: '90%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        />
    </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>List medicine</DialogTitle>
        <Formik>
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? <span className="error">{errors.name}</span> : null}

              <TextField
                margin="dense"
                name="price"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                 onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.price && errors.price ? (
                <span className="error">{errors.price}</span>
              ) : null}
              <TextField
                margin="dense"
                name="expiry"
                label="Expiry"
                type="text"
                fullWidth
                variant="standard"
                 onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.expiry && errors.expiry ? (
                <span className="error">{errors.expiry}</span>
              ) : null}

              <TextField
                margin="dense"
                name="quantity"
                label="Quantity"
                type="text"
                fullWidth
                variant="standard"
                 onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.quantity && errors.quantity ? (
                <span className="error">{errors.quantity}</span>
              ) : null}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add Medicine</Button>
              </DialogActions>
            </DialogContent>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}
