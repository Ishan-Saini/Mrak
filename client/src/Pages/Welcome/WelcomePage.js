import React, { useContext } from 'react';
import classes from './WelcomePage.module.css';
import cloud from '../../images/cloud.svg';
import AuthForm from '../../components/UI/AuthForm/AuthForm';
import UserContext from '../../store/User-Context';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';

const WelcomePage = (props) => {
  const userCtx = useContext(UserContext);

  if (userCtx.isLoading) return <Loader loading={userCtx.isLoading} />;
  if (userCtx.isLoggedIn) return <Redirect to="/files" />;

  return (
    <React.Fragment>
      <div className={`landing + ${classes.landingPage}`}>
        <div className={classes['landing-svg__container']}>
          <img src={cloud} alt="cloud" className={classes['landing-svg']} />
        </div>
        <div className={classes['landing-content__container']}>
          <h1>Secure cloud storage</h1>
          <p>Keep your files safe</p>
          <div className={classes['landing-content-btn__container']}>
            <button
              type="button"
              className={classes['landing-content__auth-btn']}
            >
              Login
            </button>
            <button
              type="button"
              className={classes['landing-content__auth-btn']}
            >
              Signup
            </button>
          </div>
        </div>
        <div className={classes['landing-form__container']}>
          <AuthForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
