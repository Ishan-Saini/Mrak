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
        <div className={classes['landing-text__container']}>
          <h1>MRAK | Secure cloud storage</h1>
          <p>Keep your files safe</p>
        </div>
        <div className={classes['landing-form__container']}>
          <AuthForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
