import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { baseURL, currCountryCode } from './functions/BaseURL';
import MyNav from './components/myNav/MyNav';
import ScrollToTopButton from './components/scrollToTopButton/ScrollToTopButton';
import DiscoverHome from './pages/discoverHome/DiscoverHome';
import DefaultPage from './pages/defaultPage/DefaultPage';
import MyMainHome from './pages/myMainHome/MyMainHome';
import CarHome from './pages/carHome/CarHome';
import DiscoverCategoryPage from './pages/discoverCategoryPage/DiscoverCategoryPage';
import SingleDiscoverNamePage from './pages/singleDiscoverNamePage/SingleDiscoverNamePage';
import NewCar from './pages/newCarPage/NewCar';
import SingleProductPage from './pages/singleProductPage/SingleProductPage';

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [scrollToggle, setScrollToggle] = useState(false);
  const navigator = useNavigate();

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setScrollToggle(true);
    } else {
      setScrollToggle(false);
    }
  });

  const { data, error } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const fetchData = await fetch(`${baseURL}/countries`);
      const response = await fetchData.json();
      return response.data;
    },
  });
  useEffect(() => {
    if (currCountryCode === location?.pathname.split('/')[1]) {
      navigator(`${location?.pathname}${location?.search ? location?.search : ""}`);
    } else if (localStorage.getItem('curr-country')) {
      if (currCountryCode !== location?.pathname.split('/')[1] && location?.pathname.split('/')[1]) {
        localStorage.setItem('curr-country', location?.pathname.split('/')[1]);
        navigator(`${location?.pathname}${location?.search ? location?.search : ""}`);
        window.location.reload();
      } else {
        navigator(`/${currCountryCode}`);
        window.location.reload();
      }
    } else if (!currCountryCode && location?.search) {
      localStorage.setItem('curr-country', location?.pathname.split('/')[1]);
      navigator(`${location?.pathname}${location?.search ? location?.search : ""}`);
      window.location.reload();
    } else {
      navigator("/");
    }
  }, [currCountryCode]);

  const [token, setToken] = useState(localStorage.getItem('userToken') || '');
  const handleLoginOrRegister = (tok) => {
    // const expirationDate = new Date();
    // expirationDate.setFullYear(expirationDate.getFullYear() + 1000);
    const userToken = tok;
    localStorage.setItem('userToken', userToken);
    // setCookie('userToken', userToken , {path: `/` ,maxAge: expirationDate });
    setToken(userToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      setToken(storedToken);
      navigator(`${location.pathname}${location.search ? location.search : ''}`);
    } else {
      navigator(`/${currCountryCode}`);
    }
  }, [localStorage.getItem('userToken')]);

  const handleLogout = () => {
    (async () => {
      const fetchLogout = await fetch(`${baseURL}/logout`, {
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const response = await fetchLogout.json();
      console.log(response);
    })()
    localStorage.removeItem('userToken');
    setToken('');
  };
  return (
    <>
      {
        !(
          (currentRoute.toLowerCase() === `/${currCountryCode}/login`.toLowerCase())
          ||
          (currentRoute.toLowerCase() === `/${currCountryCode}/register`.toLowerCase())
        ) &&
        <>
          <MyNav token={token} handleLogout={handleLogout} countriesData={data?.countries} scrollToggle={scrollToggle} />
          <ScrollToTopButton />
        </>
      }
      <Routes>
        <Route path='/' element={<DefaultPage countriesData={data?.countries} />} />
        <Route path={`/${currCountryCode}`} element={<DiscoverHome />} />
        <Route path={`/${currCountryCode}/cars`} element={<CarHome />} />
        <Route path={`/${currCountryCode}/new-cars`} element={<NewCar />} />
        <Route path={`/${currCountryCode}/new-cars?:slug`} element={<NewCar />} />
        <Route path={`/${currCountryCode}/car-Info/:carId`} element={<SingleProductPage />} />
        <Route path={`/${currCountryCode}/discover`} element={<DiscoverHome />} />
        <Route path={`/${currCountryCode}/:categoryName`} element={<DiscoverCategoryPage />} />
        <Route path={`/${currCountryCode}/:discoverName`} element={<SingleDiscoverNamePage token={token}/>} />
      </Routes>
    </>
  );
}

export default App;
