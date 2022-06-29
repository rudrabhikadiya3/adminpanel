import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import "yup-phone";
import { useFormik, Form, Formik } from "formik";
import { TouchAppRounded } from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";



export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter valid email"),
    phone: yup
      .string()
      .required("Please enter a number")
      .phone(null, true, "Please enter a valid number"),
    age: yup
      .number()
      .required("Please enter age")
      .positive("Please enter valid age")
      .integer("Please enter valid age"),
    doctor: yup.string().required("Please enter name"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      doctor: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleClose();
      dataInLocal(values);
    },
  });
  const { handleBlur, handleChange, handleSubmit, touched, errors } = formik;


  const dataInLocal = (values) => {
    let localData = JSON.parse(localStorage.getItem("patients"));

      if (localData === null) {
        localStorage.setItem('patients',JSON.stringify([values]));
        console.log(localData);
      } else {
        localData.push(values);
        localStorage.setItem('patient', JSON.stringify(localData));
        console.log(localData);
      }
    console.log(localData);
  };

  
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone", headerName: "Contact number", width: 130 },
    { field: "age", headerName: "Age", width: 130 },
    { field: "doctor", headerName: "Doctor name", width: 130 },
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

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add patient
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add patient data</DialogTitle>
        <Formik>
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
              />
              {touched.name && errors.name ? (
                <span className="error">{errors.name}</span>
              ) : null}
              <TextField
                name="email"
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <span className="error">{errors.email}</span>
              ) : null}
              <TextField
                name="phone"
                margin="dense"
                label="Mobile number"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phone && errors.phone ? (
                <span className="error">{errors.phone}</span>
              ) : null}
              <TextField
                name="age"
                margin="dense"
                label="Age"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.age && errors.age ? (
                <span className="error">{errors.age}</span>
              ) : null}
              <TextField
                name="doctor"
                margin="dense"
                label="Doctor name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.doctor && errors.doctor ? (
                <span className="error">{errors.doctor}</span>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
}
