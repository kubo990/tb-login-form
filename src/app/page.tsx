'use client';

import React from 'react';
import { Controller, useForm } from "react-hook-form"
import axios from 'axios';
import { Button, Grid, InputLabel, TextField } from '@mui/material';
import './page.css';

type LoginValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm<LoginValues>();

  const onSubmit = async (data: LoginValues) => {
    try {
      //const response = await axios.post('user/login', data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='tb-login-content'>
      <div className='tb-login-header'>
        <h1>Prihlásenie</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='tb-form'>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <InputLabel className='tb-form-label'>Email</InputLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ 
                required: 'E-mail je povinný.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mailová adresa nie je validná.'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  InputProps={{
                    className:"tb-text-field__input"
                  }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <InputLabel className='tb-form-label'>Heslo</InputLabel>

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ 
                required: 'Heslo je povinné.',
                minLength: {
                  value: 8,
                  message: 'Heslo musí mať aspoň 8 znakov.'
                },
                validate: {
                  containsUppercase: value =>
                    /[A-Z]/.test(value) || 'Heslo musí obsahovať aspoň jedno veľké písmeno.',
                  containsNumber: value =>
                    /\d/.test(value) || 'Heslo musí obsahovať aspoň jedno číslo.',
                  containsSpecialCharacter: value =>
                    /[^a-zA-Z\d]/.test(value) || 'Heslo musí obsahovať aspoň jeden špeciálny znak.'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  InputProps={{
                    className:"tb-text-field__input"
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <div className='mg-top-60'>
          <Button type="submit" variant="contained" color="primary" className="tb-button">
            Prihlásiť
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
