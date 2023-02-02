import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Home = () => {
  const handleResetData = () => {
    window.localStorage.setItem('students', '[]');
    window.localStorage.setItem('courses', '[]');
    window.localStorage.setItem('results', '[]');
    NotificationManager.success('Data erased successfully');
  };

  return (
    <>
      <h2>Home</h2>
      <button type="button" onClick={handleResetData}>Reset data</button>
      <NotificationContainer />
    </>
  );
};

export default Home;
