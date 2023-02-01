import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import {
  Home,
  Students,
  Courses,
  Grades,
} from './pages';

const Container = styled.div`
    border-radius: 10px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
    background-color: #FFF;
    border: 1px solid black;
`;
const Main = () => (
  <Container>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/students" element={<Students />} />
      <Route exact path="/courses" element={<Courses />} />
      <Route exact path="/grades" element={<Grades />} />
    </Routes>
  </Container>
);

export default Main;
