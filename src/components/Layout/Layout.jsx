import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { Button, Loader } from 'components';

import css from 'components/Layout/Layout.module.css';
import {
  authLogOutUser,
  selectAuthIsLoggedIn,
  selectAuthUserData,
} from '../../redux';

export const Layout = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const { name } = useSelector(selectAuthUserData);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authLogOutUser())
      .unwrap()
      .catch(() =>
        NotificationManager.error(
          `Something went wrong, please reload page and login again`
        )
      );
  };

  return (
    <div className={css.container}>
      <header>
        <h1>Phonebook</h1>
        <nav className={css.nav_wraper}>
          <NavLink to={'/'} className={css.nav_link}>
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                to={'/contacts'}
                className={`${css.nav_link} ${css.nav_link_contacts}`}
              >
                Contacts
              </NavLink>
              <p className={css.nav_text}>{`Hello, ${name}!`} </p>
              <Button onClick={handleLogOut} type={'button'}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to={'/register'}
                className={`${css.nav_link} ${css.nav_link_register}`}
              >
                Register
              </NavLink>
              <NavLink to={'/login'} className={css.nav_link}>
                Log in
              </NavLink>
            </>
          )}
        </nav>
      </header>

      <Suspense fallback={<Loader />}>
        <main style={{ height: '100%' }}>
          <Outlet />
        </main>
      </Suspense>
      <NotificationContainer />
    </div>
  );
};
