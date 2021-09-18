import React from 'react';

import { SegmentType } from '@interfaces/enums';
import { Segment } from '@interfaces/shared';
import { TrendingDown, TrendingFlat, TrendingUp } from '@mui/icons-material';
import { Box, Chip, ListItemButton, Stack, Typography } from '@mui/material';
import { useAppContext } from '@context/AppContext';

interface SegmentListItem {
  segment: Segment;
}

const SEGMENT_TYPE_ICONS = {
  [SegmentType.DOWNHILL]: <TrendingDown />,
  [SegmentType.FLAT]: <TrendingFlat />,
  [SegmentType.HILLY]: <TrendingUp />,
};

const SegmentListItem: React.FC<SegmentListItem> = ({ segment }) => {
  const { api } = useAppContext();

  const steepChipColor = (): 'success' | 'info' | 'error' => {
    if (segment.steep < 2.0) {
      return 'success';
    }

    if (segment.steep < 7.5) {
      return 'info';
    }

    return 'error';
  };

  const handleOnClick = () => {
    api.segments.getSingle(segment._id);
  };

  return (
    <ListItemButton sx={{ paddingY: 2 }} onClick={handleOnClick}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Stack spacing={1} flex={3}>
          <Typography variant="h6">{segment.name}</Typography>
          <Typography variant="body2">{`${segment.distance} km`}</Typography>
        </Stack>

        <Box flex={1}>
          <Chip
            label={`${segment.steep.toFixed(2)} %`}
            color={steepChipColor()}
          />
        </Box>

        <Stack spacing={0.5} alignItems="center">
          <Typography variant="body2">Type</Typography>
          {SEGMENT_TYPE_ICONS[segment.type]}
        </Stack>
      </Stack>
    </ListItemButton>
  );
};

export default SegmentListItem;
