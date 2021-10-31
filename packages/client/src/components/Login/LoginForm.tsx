import React from 'react';

import { useForm } from 'react-hook-form';
import { Stack, TextField, Button } from '@mui/material';
import { LoginForm } from '@interfaces/forms';
import { useAppContext } from '@context/AppContext';

const LoginForm: React.FC = () => {
  // App state
  const { api } = useAppContext();

  // Login form state
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginForm>();

  const handleOnLogin = (data: LoginForm) => {
    api.user.login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(handleOnLogin)}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <TextField
            label="Email"
            variant="standard"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email', {
              required: {
                value: true,
                message: 'This field is required'
              }
            })}
          />
          <TextField
            type="password"
            label="Password"
            variant="standard"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register('password', {
              required: {
                value: true,
                message: 'This field is required'
              }
            })}
          />
        </Stack>

        <Button sx={{ alignSelf: 'flex-end' }} variant="outlined" type="submit">
          Log in
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
