import './App.css'
import styled from 'styled-components'
import Counter from './components/Counter'
import Todo from './components/Todo'

function App() {


  return (
    <Container>
      FrontendQuestions
      <Counter />
      <Todo />
    </Container>
  )
}

export default App

const Container = styled.div`
  
`