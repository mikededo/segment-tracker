import React from 'react';

import { useHistory } from 'react-router-dom';

import { SegmentView } from '@components/Segments';
import { useAppContext } from '@context/AppContext';
import { Button, Stack, Typography } from '@mui/material';

const SegmentContainer: React.FC = () => {
  // Router hooks
  const history = useHistory();

  const {
    segments: { active, clearActive },
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
        <Typography variant="h3">{active?.name}</Typography>
        <Stack spacing={2} direction="row">
          <Button variant="text" color="primary" onClick={handleOnBack}>
            Back
          </Button>

          <Button>New stat</Button>
        </Stack>
      </Stack>

      <SegmentView />
    </>
  );
};

export default SegmentContainer;
