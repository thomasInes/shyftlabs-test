import styled from 'styled-components'
import Main from './components/Main'
import Navbar from './components/Navbar'

const AppContainer = styled.div`
  display: flex;
  height: 100%;
`

function App() {
  return (
    <AppContainer>
      <Navbar />
      <Main />
    </AppContainer>
  );
}

export default App;
