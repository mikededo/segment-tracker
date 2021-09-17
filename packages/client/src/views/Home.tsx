import React, { useEffect } from 'react';

import { ContentLayout } from '@components/common';
import { useAppContext } from '@context/AppContext';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

const Home: React.FC = () => {
  const { api, segments } = useAppContext();

  useEffect(() => {
    api.segments.getAll();
  }, []);

  return (
    <ContentLayout title="Segment Tracker">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">Your segments</Typography>
        <Button>Create</Button>
      </Stack>

      <List>
        {segments.segments.map((segment) => (
          <ListItem>
            <ListItemText
              primary={segment.name}
              secondary={`${segment.distance} km`}
            />
          </ListItem>
        ))}
      </List>
    </ContentLayout>
  );
};

export default Home;
