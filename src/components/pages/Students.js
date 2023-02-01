import { useState } from 'react';
import styled from 'styled-components'

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
    tr:nth-child(odd), thead td {background-color: lightgreen;}
    td{
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

        students.push({ firstName, lastName, dob });
        setStudents(students)
        window.localStorage.setItem('students', JSON.stringify(students))
        clearForm();
    }

    const validate = (e) => {
        if (!firstName || !lastName || !dob) {
            setFormError('The form must be completed')
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
                <input
                    type='text'
                    name='dob'
                    placeholder='Date of Birth'
                    onChange={e => setDob(e.target.value)}
                    value={dob || ''}
                />
                <button type='submit'>Submit</button>
            </StudentForm>


            {students.length &&
                <StudentList>
                    <thead>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Date of Birth</td>
                    </thead>
                    {students.map(student => (
                        <tr>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.dob}</td>
                        </tr>
                    ))}
                </StudentList>}
        </>
    );
}