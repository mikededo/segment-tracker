import React from 'react';

import { SegmentList } from '@components/Segments';
import { Button, Stack, Typography } from '@mui/material';

const SegmentsContainer: React.FC = () => (
  <>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h3">Your segments</Typography>
      <Button>Create</Button>
    </Stack>

    <SegmentList />
  </>
);

export default SegmentsContainer;
