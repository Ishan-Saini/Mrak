import { useState, useEffect } from 'react';
import axios from 'axios';

const useCheckUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: 'http://127.0.0.1:5000/api/v1/users/checkUser',
          withCredentials: true,
        });
        const resUser = res.data.data.user;
        setUser(resUser);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  return {
    isLoading,
    user,
    setUser,
  };
};

export default useCheckUser;
