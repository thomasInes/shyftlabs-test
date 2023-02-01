import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import styled from 'styled-components'

import "react-datepicker/dist/react-datepicker.css"
import 'react-notifications/lib/notifications.css';

const CourseForm = styled.form`
display: flex;
flex-direction: column;

input, button{
    margin-top: 20px;
}
input{
    width: 17rem;
    height: 1.5rem;
}
`

const CoursesList = styled.table`
    margin-top: 30px;
    thead td{font-weight: bold;}
    tr:nth-child(even), thead tr {background-color: lightgreen;}
    td, th{
        padding: 5px 15px;
    }
`

export const Courses = () => {
    const [courses, setCourses] = useState(JSON.parse(window.localStorage.getItem('courses')) || []);
    const [courseName, setCourseName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
            return;

        courses.push(courseName);
        setCourses(courses)
        window.localStorage.setItem('courses', JSON.stringify(courses))
        NotificationManager.success('New course added successfully');

        clearForm();
    }

    const validate = (e) => {

        if (!courseName) {
            NotificationManager.error('The form must be completed', null, 5000);
            return false;
        }

        return true;
    }
    const clearForm = () => {
        setCourseName('')
    }
    return (
        <>
            <h2>Courses</h2>
            <CourseForm onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    placeholder='Course Name'
                    onChange={e => setCourseName(e.target.value)}
                    value={courseName || ''}
                />
                <button type='submit'>Submit</button>
            </CourseForm>


            {courses.length > 0 &&
                <CoursesList>
                    <thead>
                        <tr><th>Name</th></tr>
                    </thead>
                    <tbody>
                        {courses.map(course => <tr key={course} ><td>{course}</td></tr>)}
                    </tbody>
                </CoursesList>}

            <NotificationContainer />
        </>
    );
}