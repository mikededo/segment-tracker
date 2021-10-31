import React, { useEffect } from 'react';

import { Redirect, Switch, useLocation, useRouteMatch } from 'react-router-dom';

import { ContentLayout } from '@components/common';
import { SegmentContainer, SegmentsContainer } from '@components/Home';
import { useAppContext } from '@context/AppContext';
import PrivateRoute from '@routes/PrivateRoute';

const Home: React.FC = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const { api } = useAppContext();

  useEffect(() => {
    api.segments.getAll();
  }, []);

  const HomeRedirect = () => <Redirect to={`${path}/segments`} />;

  return (
    <ContentLayout title="Segment Tracker">
      <Switch location={location}>
        <PrivateRoute
          path={`${path}/segments/:id`}
          component={SegmentContainer}
          exact
        />
        <PrivateRoute
          exact
          path={`${path}/segments`}
          component={SegmentsContainer}
        />

        <PrivateRoute path="/" component={HomeRedirect} />
      </Switch>
    </ContentLayout>
  );
};

export default Home;
