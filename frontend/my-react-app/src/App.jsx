import { Box, useColorModeValue } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage'
import NavBar from './components/common/NavBar';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import LoadingSpinner from './components/skeleton/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import UnAuthNavBar from './components/common/UnAuthNavBar';
import ProductsPage from './pages/ProductsPage';
import Product from './pages/Product';
import ProfilePage from './pages/profile/ProfilePage';
function App() {
  const { data: authUser, isLoading, isError, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me/');
        const data = await res.json();
        if(data.error) {
          return null;
        }
        if(!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        console.log(data);
        return data;
      }
      catch(error) {
        throw new Error(error)
      }
    },
    retry: false
  });
  if(isLoading) {
    return (
      <LoadingSpinner />
    )
  }
  return(
    <Box minH = {"100vh"} bg={useColorModeValue("gray.250", "gray.900")}>
      {authUser ? <NavBar/> : <UnAuthNavBar />}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
        <Route path="/create" element={authUser ? <CreatePage/> : <Navigate to='/login'/>}/>
        <Route path="/register" element={!authUser ? <RegisterPage />: <Navigate to='/' />}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/' />}/>
        <Route path='/products/:username' element={authUser ? <ProductsPage /> : <Navigate to='/login' />} />
        <Route path='/product/:id' element={authUser ? <Product /> : <Navigate to='/login' />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
    </Box>
    
  )
};

export default App
