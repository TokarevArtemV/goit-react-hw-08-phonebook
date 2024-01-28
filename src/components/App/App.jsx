import { Route, Routes, useLocation } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { ContactDetails, Contacts } from 'pages';

import 'react-notifications/lib/notifications.css';
import css from 'components/App/App.module.css';

export const App = () => {
  const location = useLocation();

  return (
    <div className={css.appWraper}>
      <h1>Phonebook</h1>
      <Routes>
        <Route index element={<Contacts />} />
        <Route
          path="/:contactId"
          element={<ContactDetails location={location} />}
        />
      </Routes>
      <NotificationContainer />
    </div>
  );
};
