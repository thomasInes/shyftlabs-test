import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-notifications/lib/notifications.css';

const ResultForm = styled.form`
display: flex;
flex-direction: column;

input, button{
    margin-top: 20px;
}
input{
    width: 17rem;
    height: 1.5rem;
}
`;

const ResultsList = styled.table`
    margin-top: 30px;
    thead td{font-weight: bold;}
    tr:nth-child(even), thead tr {background-color: lightgreen;}
    td, th{
        padding: 5px 15px;
    }
`;

const Grades = () => {
  const [students] = useState(JSON.parse(window.localStorage.getItem('students')) || []);
  const [courses] = useState(JSON.parse(window.localStorage.getItem('courses')) || []);
  const [results, setResults] = useState(JSON.parse(window.localStorage.getItem('results')) || []);
  const [grade, setGrade] = useState('0');
  const [student, setStudent] = useState('0');
  const [course, setCourse] = useState('0');

  const validate = () => {
    if (grade === '0' || student === '0' || course === 0) {
      NotificationManager.error('The form must be completed', null, 5000);
      return false;
    }

    return true;
  };
  const clearForm = () => {
    setGrade('0');
    setStudent('0');
    setCourse('0');
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    results.push({ student, course, grade });
    setResults(results);
    window.localStorage.setItem('results', JSON.stringify(results));
    NotificationManager.success('New result added successfully');

    clearForm();
  };

  return (
    <>
      {students.length <= 0 && <h4>Please add students</h4>}
      {courses.length <= 0 && <h4>Please add courses</h4>}
      {students.length > 0 && courses.length > 0
        && (
          <>
            <h2>Results</h2>
            <ResultForm onSubmit={handleSubmit}>
              <select
                name="student"
                onChange={(e) => { setStudent(e.target.value); }}
                value={student}
              >
                <option key="0" value="0">-- select student --</option>
                {students.map((el) => (
                  <option
                    value={`${el.firstName} ${el.lastName}`}
                    key={`${el.firstName} ${el.lastName}`}
                  >
                    {`${el.firstName} ${el.lastName}`}
                  </option>
                ))}
              </select>
              <select
                name="course"
                onChange={(e) => { setCourse(e.target.value); }}
                value={course}
              >
                <option key="0" value="0">-- select course --</option>
                {courses.map((el) => <option key={el} value={el}>{el}</option>)}
              </select>
              <select
                name="grade"
                onChange={(e) => { setGrade(e.target.value); }}
                value={grade}
              >
                <option key="0" value="0">-- select grade --</option>
                {['A', 'B', 'C', 'D', 'E'].map((el) => <option key={el} value={el}>{el}</option>)}
              </select>
              <button type="submit">Submit</button>
            </ResultForm>
          </>
        )}

      {results.length > 0
        && (
          <ResultsList>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={`${result.student}-${result.course}-${result.grade}`}>
                  <td>{result.student}</td>
                  <td>{result.course}</td>
                  <td>{result.grade}</td>
                </tr>
              ))}
            </tbody>
          </ResultsList>
        )}

      <NotificationContainer />
    </>
  );
};

export default Grades;
