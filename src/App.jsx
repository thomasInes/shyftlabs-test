import React from 'react';
import styled from 'styled-components';
import Main from './components/Main';
import Navbar from './components/Navbar';

const AppContainer = styled.div`
  display: flex;
  height: 100%;
`;

const App = () => (
  <AppContainer>
    <Navbar />
    <Main />
  </AppContainer>
);

export default App;
