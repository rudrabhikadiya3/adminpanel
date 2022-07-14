import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import "yup-phone";
import { useFormik, Form, Formik } from "formik";

import { DataGrid } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";



export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const [search, setSearch] = useState([])

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
      listdata();
    },
  });
  const { handleBlur, handleChange, handleSubmit, touched, errors } = formik;


  const dataInLocal = (values) => {
    const localData = JSON.parse(localStorage.getItem("patients"));

    const id = Math.floor(Math.random()*1000);
    let dataWithId = {
      id: id,
      ...values
    }
      if (localData === null) {
        localStorage.setItem('patients',JSON.stringify([dataWithId]));
      } else {
        localData.push(dataWithId);
        localStorage.setItem('patients', JSON.stringify(localData));
      }
  };

  const listdata = () =>{
    let localData = JSON.parse(localStorage.getItem('patients'));
    if (localData !== null) {
      setData(localData)
    }
  }
  useEffect(() =>{
    listdata();
  }, [])
  
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Contact number", width: 150 },
    { field: "age", headerName: "Age", width: 150 },
    { field: "doctor", headerName: "Doctor name", width: 150 },
  ];

  const handleSearch = (val) => {
    let localdata = JSON.parse(localStorage.getItem("patients"))
    let searchData = localdata.filter((d) => 
      d.name.toLowerCase().includes(val.toLowerCase()) ||
      d.email.toString().includes(val.toString()) ||
      d.phone.toString().includes(val.toString()) ||
      d.age.toString().includes(val.toString()) ||
      d.doctor.toLowerCase().includes(val.toLowerCase()) 
    )
   setSearch(searchData);
  }
  const showdata = search.length > 0 ? search : data;
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add patient
      </Button>
      <TextField
                name="serch"
                margin="dense"
                label="Search"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e)=>handleSearch(e.target.value)}
              />
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
              {touched.email && errors.email ? 
                <span className="error">{errors.email}</span>
               : null }
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
              {touched.phone && errors.phone ? 
                <span className="error">{errors.phone}</span>
               : null}
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
              {touched.age && errors.age ? 
                <span className="error">{errors.age}</span>
               : null}
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
          rows={showdata}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
}
