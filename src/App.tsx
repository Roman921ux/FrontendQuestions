import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import Main from './components/Main'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/auth/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import UserQuestionsPage from './pages/UserQuestionsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import { RootStoreContext } from './root-store-context'
import RootStore from './store/root-store'
import AuthRequire from './pages/auth/AuthRequire'
import CreateQPage from './pages/CreateQPage'
import RoleRequire from './pages/auth/RoleRequire'

function App() {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} >
            <Route path="/" element={<HomePage />} />
            <Route path="profile" element={
              <AuthRequire>
                <ProfilePage />
              </AuthRequire>
            } />
            <Route path="learning" element={
              <AuthRequire>
                <UserQuestionsPage />
              </AuthRequire>
            } />
            <Route path="question" element={
              <RoleRequire>
                <CreateQPage />
              </RoleRequire>
            } />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Container>
    </RootStoreContext.Provider>
  )
}

export default App

const Container = styled.div` 
/* border: 1px solid blue; */
  display: flex;
  justify-content: space-between;
  gap: 20px;
  /* margin: 0 auto; */
  width: 1280px;
  height: 90vh;
  padding: 20px;
`