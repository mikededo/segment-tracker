import React, { useState } from 'react';

import { CreateSegmentDialog, SegmentList } from '@components/Segments';
import { Button, Stack, Typography } from '@mui/material';

const SegmentsContainer: React.FC = () => {
  const [create, setCreate] = useState(false);

  const handleOnCreate = () => {
    setCreate(true);
  };

  const handleOnCancel = () => {
    setCreate(false);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h3">Your segments</Typography>
        <Button onClick={handleOnCreate}>Create</Button>
      </Stack>

      <SegmentList />

      <CreateSegmentDialog open={create} onClose={handleOnCancel} />
    </>
  );
};

export default SegmentsContainer;
