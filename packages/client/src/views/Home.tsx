import React, { useEffect } from 'react';

import { ContentLayout } from '@components/common';
import { SegmentContainer, SegmentsContainer } from '@components/Home';
import { useAppContext } from '@context/AppContext';

const Home: React.FC = () => {
  const {
    api,
    segments: { active },
  } = useAppContext();

  useEffect(() => {
    api.segments.getAll();
  }, []);

  return (
    <ContentLayout title="Segment Tracker">
      {!active ? <SegmentsContainer /> : <SegmentContainer />}
    </ContentLayout>
  );
};

export default Home;
