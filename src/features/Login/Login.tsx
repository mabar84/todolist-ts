import React from 'react';
import {useFormik} from 'formik';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from '@mui/material';
import {loginTC} from './auth-reducer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {Navigate} from 'react-router-dom';

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Required'
                }
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {
                    email: 'Invalid email address'
                }
            }
            if (!values.password) {
                return {
                    password: 'password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    if (isLoggedIn) {
        return <Navigate to="/"/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                label={'email'}
                                margin={'normal'}
                                {...formik.getFieldProps('email')} />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField
                                label={'password'}
                                type={'password'}
                                margin={'normal'}
                                {...formik.getFieldProps('password')}/>
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label={'remember me'}
                                control={<Checkbox
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps('rememberMe')}
                                />}
                            />
                            <Button type="submit" variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};