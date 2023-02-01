import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
    border-radius: 10px;
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
    background-color: #FFF;
    border: 1px solid black;
    margin-right: 30px;
`;
const Link = styled(NavLink)`
    margin-top: 10px;
    text-decoration: none;
    color: #080808;
    font-size: 1.4rem;
    :hover, &.active{
        text-decoration: underline;
    }
`

const Navbar = () => (
    <Container>
        <Link exact activeClassName='active' to='/'>Home</Link>
        <Link exact activeClassName='active' to='/students'>Students</Link>
        <Link exact activeClassName='active' to='/courses'>Courses</Link>
        <Link exact activeClassName='active' to='/grades'>Grades</Link>
    </Container>
)

export default Navbar;