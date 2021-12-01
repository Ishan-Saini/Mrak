import React, { useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../store/User-Context';
import Loader from '../components/UI/Loader/Loader';
import Sidebar from '../components/layout/Sidebar/Sidebar';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const userCtx = useContext(UserContext);
  const [refresh, setRefresh] = useState(false);

  const refreshToggler = () => {
    setRefresh((el) => !el);
  };

  if (userCtx.isLoading) return <Loader loading={userCtx.isLoading} />;

  if (userCtx.user) {
    return (
      <React.Fragment>
        <Sidebar refreshToggler={refreshToggler} />
        <Route
          {...rest}
          render={(props) => <Component refresh={refresh} {...props} />}
        />
      </React.Fragment>
    );
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
