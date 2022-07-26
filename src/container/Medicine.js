import { React, useEffect, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { autocompleteClasses } from "@mui/material";

import { useSelector, useDispatch } from 'react-redux';
import { getMedicine } from "../redux/action/medicine.action";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [alertData, setAlertData] = useState(0);

  const [editData, setEditData] = useState(false);

  const [dopen, setDOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(false);
    formik.resetForm();
  };

  const handleDClickOpen = () => {
    setDOpen(true);
  };

  const handleDClose = () => {
    setDOpen(false);
  };
  let schema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    price: yup
      .number("Please enter valid price")
      .required("Please enter price")
      .positive("price cant be in negative"),
    expiry: yup.string().required("Please enter expiry"),
    quantity: yup.string().required("Please enter quantity"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      expiry: "",
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleClose();
      if (editData) {
        updateData(values);
      } else {
        toStorage(values);
      }
      loadData(values);
    },
  });
  const { handleSubmit, handleChange, errors, handleBlur, touched, values } =
    formik;

  //to local storage
  const toStorage = (values) => {
    const localData = JSON.parse(localStorage.getItem("medicine"));

    const id = Math.floor(Math.random() * 1000);

    let withIdData = {
      id: id,
      ...values,
    };

    if (localData === null) {
      localStorage.setItem("medicine", JSON.stringify([withIdData]));
    } else {
      localData.push(withIdData);
      localStorage.setItem("medicine", JSON.stringify(localData));
    }
  };

  // table
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "price", headerName: "Price", width: 80 },
    { field: "expiry", headerName: "Expiry", width: 80 },
    { field: "quantity", headerName: "Quantity", width: 80 },
    {
      field: "manage",
      headerName: "Manage",
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleDClickOpen();
              setAlertData(params.id);
            }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton aria-label="edit" onClick={() => editFormOpen(params)}>
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const loadData = () => {
    const localData = JSON.parse(localStorage.getItem("medicine"));

    if (localData !== null) {
      setData(localData);
    }
  };

  const deletFunction = (params) => {
    let localData = JSON.parse(localStorage.getItem("medicine"));
    let fData = localData.filter((i) => i.id !== alertData);

    setData(localData);

    localStorage.setItem("medicine", JSON.stringify(fData));
    loadData();
    handleDClose();
  };

  const editFormOpen = (params) => {
    handleClickOpen();
    formik.setValues(params.row);
    setEditData(true);
  };

  const updateData = (values) => {
    let localData = JSON.parse(localStorage.getItem("medicine"));
    console.log(values);

    const uData = localData.map((nd) => {
      if (nd.id === values.id) {
        return values;
      } else {
        return nd;
      }
    });
    localStorage.setItem("medicine", JSON.stringify(uData));

    handleClose();
    loadData();
    setEditData(false);
  };

  const handleSearch = (val) => {
    let localData = JSON.parse(localStorage.getItem("medicine"));

    let searchData = localData.filter(
      (d) =>
        d.name.toLowerCase().includes(val.toLowerCase()) ||
        d.expiry.toString().includes(val) ||
        d.price.toString().includes(val) ||
        d.quantity.toString().includes(val)
    );

    setFilterData(searchData);
  };

  let filterdata = filterData.length > 0 ? filterData : data;

  const dispatch = useDispatch()
  const medData = useSelector(state=>state.medicine)
  useEffect(() => {
    // loadData();
    dispatch(getMedicine())
  }, []);


  const importD = useSelector(state=>state.counter)
  return (
    <div className="container">
      <div className="row">
        <h1>Medicine {importD.counter}</h1>
        <div className="d-flex mb-4 align-items-center">
          <div className="col-6">
            <Button variant="outlined" onClick={handleClickOpen}>
              List medicine
            </Button>
          </div>
          <div className="col-4">
            <TextField
            className="d-block"
              // margin="dense"
              name="search"
              label="Search"
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div style={{ height: 400, width: "90%" }}>
          <DataGrid
            rows={medData.medicine}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>List medicine</DialogTitle>
          <Formik values={formik}>
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
                  value={values.name}
                />
                {touched.name && errors.name ? (
                  <span className="error">{errors.name}</span>
                ) : null}

                <TextField
                  margin="dense"
                  name="price"
                  label="Price"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
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
                  value={values.expiry}
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
                  value={values.quantity}
                />
                {touched.quantity && errors.quantity ? (
                  <span className="error">{errors.quantity}</span>
                ) : null}
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  {editData === true ? (
                    <Button type="submit" onClick={() => updateData()}>
                      Change
                    </Button>
                  ) : (
                    <Button type="submit">Add</Button>
                  )}
                </DialogActions>
              </DialogContent>
            </Form>
          </Formik>
        </Dialog>
        <Dialog
          open={dopen}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are you sure?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleDClose}>no</Button>
            <Button onClick={deletFunction}>yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
