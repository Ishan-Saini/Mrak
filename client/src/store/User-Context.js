import React from 'react';
import useCheckUser from '../hooks/useCheckUser';
import axios from 'axios';

const UserContext = React.createContext({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const UserContextProvider = (props) => {
  const { user, setUser, isLoading } = useCheckUser();

  const isLoggedIn = !!user;

  const loginHandler = (user) => {
    setUser(user);
  };

  const logoutHandler = async () => {
    try {
      await axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/api/v1/users/logout',
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const userContextValue = {
    user,
    isLoggedIn,
    isLoading,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
