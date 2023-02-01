import { useState } from 'react';
import DatePicker from "react-datepicker";
import styled from 'styled-components'
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css"

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

const FormError = styled.h5`
    color: red;
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
    const [formError, setFormError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
            return;

        students.push({ firstName, lastName, dob: moment(dob).format('DD/MM/yyyy') });
        setStudents(students)
        window.localStorage.setItem('students', JSON.stringify(students))
        clearForm();
    }

    const validate = (e) => {

        if (!firstName || !lastName || !dob) {
            setFormError('The form must be completed')
            return false;
        }

        if (moment().subtract(10, 'y').isBefore(dob)) {
            setFormError('The student must be at least 10 years old')
            return false;
        }

        return true;
    }
    const clearForm = () => {
        setFirstName('')
        setLastName('')
        setDob('')
        setFormError('')
    }
    return (
        <>
            <h2>Students</h2>
            <StudentForm onSubmit={handleSubmit}>
                {formError && <FormError>{formError}</FormError>}
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
        </>
    );
}