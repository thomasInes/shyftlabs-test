import { useState } from 'react';
import DatePicker from "react-datepicker";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import styled from 'styled-components'
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css"
import 'react-notifications/lib/notifications.css';

const StudentForm = styled.form`
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

const StudentList = styled.table`
    margin-top: 30px;
    thead td{font-weight: bold;}
    tr:nth-child(even), thead tr {background-color: lightgreen;}
    td, th{
        padding: 5px 15px;
    }
`

export const Students = () => {
    const [students, setStudents] = useState(JSON.parse(window.localStorage.getItem('students')) || []);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
            return;

        students.push({ firstName, lastName, dob: moment(dob).format('DD/MM/yyyy') });
        setStudents(students)
        window.localStorage.setItem('students', JSON.stringify(students))
        NotificationManager.success('New student added successfully');

        clearForm();
    }

    const validate = (e) => {

        if (!firstName || !lastName || !dob) {
            NotificationManager.error('The form must be completed', null, 5000);
            return false;
        }

        if (moment().subtract(10, 'y').isBefore(dob)) {
            NotificationManager.error('The student must be at least 10 years old', null, 5000);
            return false;
        }

        return true;
    }
    const clearForm = () => {
        setFirstName('')
        setLastName('')
        setDob('')
    }
    return (
        <>
            <h2>Students</h2>
            <StudentForm onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName || ''}
                />
                <input
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    onChange={e => setLastName(e.target.value)}
                    value={lastName || ''}
                />
                <DatePicker
                    selected={dob}
                    onChange={(date) => setDob(date)}
                    placeholderText='Date of Birth (DD/MM/YYYY)'
                    dateFormat="dd/MM/yyyy"
                />

                <button type='submit'>Submit</button>
            </StudentForm>


            {students.length > 0 &&
                <StudentList>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={`${student.firstName}-${student.lastName}`} >
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.dob}</td>
                            </tr>
                        ))}
                    </tbody>
                </StudentList>}

            <NotificationContainer />
        </>
    );
}