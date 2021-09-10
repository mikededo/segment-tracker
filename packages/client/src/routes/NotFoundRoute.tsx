import React from 'react';

import { Divider, Stack, Typography } from '@material-ui/core';

const NotFoundRoute: React.FC = () => (
  <Stack
    height="100%"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Stack
      spacing={3}
      divider={<Divider orientation="vertical" flexItem />}
      direction="row"
      alignItems="center"
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="subtitle1">This page could not be found</Typography>
    </Stack>
  </Stack>
);

export default NotFoundRoute;
