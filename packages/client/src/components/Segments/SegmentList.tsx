import React from 'react';

import { useAppContext } from '@context/AppContext';
import { Divider, List } from '@mui/material';

import SegmentListItem from './SegmentListItem';

const SegmentList: React.FC = () => {
  const { segments } = useAppContext();

  return (
    <List>
      {segments.segments.map((segment, i) => (
        <>
          <SegmentListItem segment={segment} key={segment._id} />
          {i < segments.segments.length - 1 ? <Divider /> : null}
        </>
      ))}
    </List>
  );
};

export default SegmentList;
