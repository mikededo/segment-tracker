import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { SegmentView } from '@components/Segments';
import { useAppContext } from '@context/AppContext';
import { Button, Stack, Typography } from '@mui/material';
import { CreateSegmentStatDialog } from '@components/SegmentStats';

const SegmentContainer: React.FC = () => {
  // Router hooks
  const history = useHistory();

  const [create, setCreate] = useState(false);

  const {
    segments: { active, clearActive }
  } = useAppContext();

  const handleOnBack = () => {
    history.goBack();
    clearActive();
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h3">{active?.segment?.name}</Typography>
        <Stack spacing={2} direction="row">
          <Button variant="text" color="primary" onClick={handleOnBack}>
            Back
          </Button>

          <Button onClick={() => setCreate(true)}>New stat</Button>
        </Stack>
      </Stack>

      <SegmentView />

      <CreateSegmentStatDialog open={create} onClose={() => setCreate(false)} />
    </>
  );
};

export default SegmentContainer;
