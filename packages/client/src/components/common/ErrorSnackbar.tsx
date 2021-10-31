import React from 'react';

import { useAppContext } from '@context/AppContext';
import { Alert, Snackbar } from '@mui/material';
import { capitalize } from '@utils/helpers';

const ErrorSnackbar: React.FC = () => {
  const { api } = useAppContext();

  return (
    <Snackbar open={!api.errorDismised} onClose={api.clearError}>
      <Alert severity="error" onClose={api.clearError}>
        {api.error && capitalize(api.error.message)}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
