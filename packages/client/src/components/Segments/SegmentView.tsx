import React from 'react';

import { useAppContext } from '@context/AppContext';
import { Typography } from '@mui/material';

const SegmentView: React.FC = () => {
  const { segments } = useAppContext();

  return <Typography>{segments.active?.segment?.name}</Typography>;
};

export default SegmentView;
