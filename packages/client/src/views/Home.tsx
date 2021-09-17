import React, { useEffect } from 'react';

import { ContentLayout } from '@components/common';
import SegmentList from '@components/Segments';
import { useAppContext } from '@context/AppContext';
import { Button, Stack, Typography } from '@mui/material';

const Home: React.FC = () => {
  const { api } = useAppContext();

  useEffect(() => {
    api.segments.getAll();
  }, []);

  return (
    <ContentLayout title="Segment Tracker">
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
    </ContentLayout>
  );
};

export default Home;
