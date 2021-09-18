import React from 'react';

import { useAppContext } from '@context/AppContext';
import { Divider, List } from '@mui/material';

import SegmentListItem from './SegmentListItem';

const SegmentList: React.FC = () => {
  const { segments } = useAppContext();

  return (
    <List>
      {segments.segments.map((segment, i) => (
        <React.Fragment key={segment._id}>
          <SegmentListItem segment={segment} />
          {i < segments.segments.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </List>
  );
};

export default SegmentList;
