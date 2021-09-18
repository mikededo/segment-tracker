import React, { useEffect } from 'react';

import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import { ContentLayout } from '@components/common';
import { SegmentContainer, SegmentsContainer } from '@components/Home';
import { useAppContext } from '@context/AppContext';

const Home: React.FC = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const { api } = useAppContext();

  useEffect(() => {
    api.segments.getAll();
  }, []);

  return (
    <ContentLayout title="Segment Tracker">
      <Switch location={location}>
        <Route
          exact
          path={`${path}/segments/:id`}
          component={SegmentContainer}
        />
        <Route exact path={`${path}/segments`} component={SegmentsContainer} />

        <Route path="/">
          <Redirect to={`${path}/segments`} />
        </Route>
      </Switch>
    </ContentLayout>
  );
};

export default Home;
