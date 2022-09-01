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
import { useDispatch, useSelector } from "react-redux";
import { deletPatientAction, editPatientAction, getPatient, postPatData } from "../redux/action/patients.action";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dopen, setDOpen] = useState(false);
  const [alertData, setAlertData] = useState(0);
  const [editData, setEditData] = useState(false);

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
      handleClose();
      if (editData) {
        updateData(values);
      } else {
        listdata(values);
      }
      dataInLocal(values);
    },
  });
  const { handleSubmit, handleChange, errors, handleBlur, touched, values  } = formik;

  const dataInLocal = (values) => {
    const localData = JSON.parse(localStorage.getItem("patients"));

    const id = Math.floor(Math.random() * 1000);
    let dataWithId = {
      id: id,
      ...values,
    };

    dispatch(postPatData(dataWithId));

    // if (localData === null) {
    //   localStorage.setItem('patients',JSON.stringify([dataWithId]));
    // } else {
    //   localData.push(dataWithId);
    //   localStorage.setItem('patients', JSON.stringify(localData));
    // }
  };
  const dispatch = useDispatch();
  const listdata = () => {
    dispatch(getPatient());
  };
  useEffect(() => {
    listdata();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Contact number", width: 150 },
    { field: "age", headerName: "Age", width: 150 },
    {
      field: "doctor",
      headerName: "Doctor name",
      width: 150,
    },
    {
      field: "manage",
      headerName: "Manage",
      width: 150,
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
  const editFormOpen = (params) => {
    handleClickOpen();
    formik.setValues(params.row);
    setEditData(true);
  };
  const deletePatient = () =>{
    dispatch(deletPatientAction(alertData))
    handleDClose();
  }
  const updateData = (values) => {
    dispatch(editPatientAction(values))
    handleClose();
    setEditData(false);
  };
  const pd = useSelector((state) => state.patient);
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add patient
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {
          editData === true ? <DialogTitle>Change patient data</DialogTitle> : <DialogTitle>Add patient data</DialogTitle>
        }
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
                value={values.name}
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
                value={values.email}
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
                value={values.phone}
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
                value={values.age}
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
                value={values.doctor}
              />
              {touched.doctor && errors.doctor ? (
                <span className="error">{errors.doctor}</span>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {
                editData === true ? <Button type="submit">Change</Button> : <Button type="submit">Submit</Button> 
              }
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={pd.patient}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
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
                <Button onClick={deletePatient}>yes</Button>
              </DialogActions>
            </Dialog>
    </>
  );
}
