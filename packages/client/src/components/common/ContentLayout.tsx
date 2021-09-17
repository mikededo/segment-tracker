import React from 'react';

import { useAppContext } from '@context/AppContext';
import {
  AppBar,
  Box,
  Card,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';

interface ContentLayoutProps {
  title: string;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ title, children }) => {
  const { api } = useAppContext();

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h4">{title}</Typography>
        </Toolbar>
      </AppBar>

      {api.loading ? (
        <LinearProgress />
      ) : (
        <Box m={4}>
          <Card>{children}</Card>
        </Box>
      )}
    </>
  );
};

export default ContentLayout;
