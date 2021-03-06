import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../pages/controls/Controls";
import { useForm, Form } from '../components/useForm';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import axios from "axios"

const initialFValues = {
    id: 0,
    name: "",
    email: "",
    password:"",
    mobile: "",
    department: "",
    
}
export default function EmployeeForm() {
    
    const [open, setOpen] = React.useState(false); 

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length > 3 ? "" : "4 number PIN required."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('department' in fieldValues)
        temp.department = fieldValues.department ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        //setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            axios.post("http://localhost:5000/manager/employees", values, {withCredentials:true})
            .then(response => {resetForm()
                window.location.reload(true)})
        }
    }

    const handleClick = () => {
        setOpen(true);
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    return (
        
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Full Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Password
                        label="PIN Number"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <Controls.Input
                        name="department"
                        label="Department"
                        value={values.department}
                        onChange={handleInputChange}
                        error={errors.department}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Mobile Number"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <div>
                        <Controls.Button
                            onClick={handleClick}
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom', horizontal: 'centre'
                                }}
                                open={open} autoHideDuration={6000} onClose={handleClose}>
                                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                                Employee Created
                                </MuiAlert>
                            </Snackbar>
                    </div>

                </Grid>
            </Grid>
        </Form>
    )
}
