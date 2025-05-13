import { Box, useColorModeValue, Flex } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NavBar from './components/common/NavBar';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import LoadingSpinner from './components/skeleton/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import UnAuthNavBar from './components/common/UnAuthNavBar';
import ProductsPage from './pages/ProductsPage';
import Product from './pages/Product';
import ProfilePage from './pages/profile/ProfilePage';
import LandingPage from './pages/auth/LandingPage';
import Footer from './components/common/Footer';

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me/');
      const data = await res.json();
      if (data.error) return null;
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      return data;
    },
    retry: true,
  });

  const bgColor = useColorModeValue("gray.250", "gray.900");

  if (isLoading) {
    return (
      <Flex w="100vw" h="80vh" justify="center" align="center">
        <LoadingSpinner />
      </Flex>
    );
  }

  return (
    <Flex direction="column" minH="100vh" bg={bgColor}>
      {/* NavBar */}
      <Box as="header">
        {authUser ? <NavBar /> : <UnAuthNavBar />}
      </Box>

      {/* Main content */}
      <Box as="main" flex="1">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <LandingPage />} />
          <Route path="/create" element={authUser ? <CreatePage /> : <Navigate to='/login' />} />
          <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to='/' />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/products/:username' element={authUser ? <ProductsPage /> : <Navigate to='/login' />} />
          <Route path='/product/:id' element={authUser ? <Product /> : <Navigate to='/login' />} />
          <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        </Routes>
      </Box>

      {/* Sticky Footer */}
      <Box as="footer" mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}

export default App;