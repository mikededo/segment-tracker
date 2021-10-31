import React from 'react';

import { ErrorSnackbar } from '@components/common';
import { LoginForm } from '@components/Login';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

const Login: React.FC = () => (
  <>
    <Stack height="100%" flexDirection="column" justifyContent="center">
      <Container maxWidth="sm">
        <Paper variant="outlined">
          <Box p={3}>
            <Stack spacing={2}>
              <div>
                <Typography variant="h1" pb={1}>
                  Welcome back!
                </Typography>
                <Typography variant="subtitle1">
                  Log in to start using the app again
                </Typography>
              </div>

              <LoginForm />
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Stack>

    <ErrorSnackbar />
  </>
);

export default Login;
