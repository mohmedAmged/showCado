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
import PageNotFound from './pages/pageNotFound/PageNotFound';
import UserDashBoard from './pages/userDashboard/UserDashBoard';
import Register from './components/register/Register';
import Login from './components/login/Login';
import MyFooter from './components/myFooter/MyFooter';
import RealEstateHome from './pages/RealEstateHome/RealEstateHome';
import palace from './assets/realestateIcons/icons8-palace-64.png';
import villa from './assets/realestateIcons/icons8-villa-64.png';
import apartment from './assets/realestateIcons/icons8-apartment-64.png';
import chalet from './assets/realestateIcons/icons8-chalet-50.png';
import imgUrl1 from './assets/realestateIcons/realestateBanner.jpg';
import imgUrl2 from './assets/electronicsIcons/banner.jpg';
import heroBg1 from './assets/realestateIcons/realestateBg.jpg'
import heroBg2 from './assets/electronicsIcons/elecBg.jpg'
import heroBg3 from './assets/mobileIcons/mobilesBg.jpg'
import imgUrl3 from './assets/mobileIcons/mobileBanner.png'
import tv from './assets/electronicsIcons/icons8-tv-50.png'
import camera from './assets/electronicsIcons/icons8-camera-50.png'
import sub from './assets/electronicsIcons/icons8-subwoofer-50.png'
import mobile from './assets/mobileIcons/icons8-mobile-50.png'
import tablets from './assets/mobileIcons/icons8-tablet-48.png'
import watches from './assets/mobileIcons/icons8-smart-watch-50.png'
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


//   const subCategData = useQuery({
//     queryKey: ['discover-sub-ctegory'],
//     queryFn: async () => {
//       const fetchData = await fetch(`${baseURL}/${currCountryCode}/discover-sub-categories`);
//       const response = await fetchData.json();
//       return response.data;
//     },
//   });
// console.log(subCategData?.data?.subCategories);

  const interestItemsReal = [
    {
        image: palace,
        id: 1,
        name: "Palace"
    },
    {
        image: villa,
        id: 2,
        name: "Villa"
    },
    {
        image: apartment,
        id: 3,
        name: "Apartment"
    },
    {
        image: chalet,
        id: 4,
        name: "chalet"
    },
]
const interestItemsElectronics = [
  {
      image: tv,
      id: 1,
      name: "Televisions"
  },
  {
      image: camera,
      id: 2,
      name: "Digital Camera"
  },
  {
      image: sub,
      id: 3,
      name: "Audio Speaker"
  },
]
const interestItemsMobiles = [
  {
      image: mobile,
      id: 1,
      name: "Smart Phones"
  },
  {
      image: tablets,
      id: 2,
      name: "Tablets"
  },
  {
      image: watches,
      id: 3,
      name: "Smart Watches"
  },
]
const bannerItemsRealestate = [
  {
      title: "Electronics",
      disc: "Discover high-quality electronics with warranty assurance, sourced from verified sellers for a reliable tech experience.",
      image: imgUrl1,
      link: 'Real Estate'
  }
]
const bannerItemsElectronics = [
  {
      title: "Electronics",
      disc: "Discover homes with warranty-backed assurance and verified sellers for a trustworthy real estate experience.",
      image: imgUrl2,
      link: 'Electronics'
  }
]
const bannerItemsMobiles = [
  {
      title: "Mobiles",
      disc: "Discover warranty-backed assurance and trusted sellers for a secure real estate experience.",
      image: imgUrl3,
      link: 'Mobiles'
  }
]
const heroItems = [
  {
      title: "Guaranteed Quality",
      subTit: "Discover homes with warranty-backed assurance and verified sellers for a trustworthy real estate experience.",
      image: heroBg1
  }
]
const heroItemsElec = [
  {
      title: "Guaranteed Quality",
      subTit: "Explore electronics with warranty-backed assurance and verified sellers for a reliable tech experience.",
      image: heroBg2
  }
]
const heroItemsMobile = [
  {
      title: "Guaranteed Quality",
      subTit: "Explore mobile devices with warranty-backed assurance and verified sellers for a reliable tech experience.",
      image: heroBg3
  }
]
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
        {/* /////// */}
        <Route path={`/${currCountryCode}/realestate`} element={<RealEstateHome interestItems={interestItemsReal} bannerItemsRealestate={bannerItemsRealestate} heroItems={heroItems}/>} />
        {/* ///////// */}
        <Route path={`/${currCountryCode}/electronics`} element={<RealEstateHome interestItems={interestItemsElectronics} bannerItemsRealestate={bannerItemsElectronics} heroItems={heroItemsElec}/>} />
        {/* ///////////////// */}
        <Route path={`/${currCountryCode}/mobiles`} element={<RealEstateHome interestItems={interestItemsMobiles} bannerItemsRealestate={bannerItemsMobiles} heroItems={heroItemsMobile}/>} />

        <Route path={`/${currCountryCode}/new-cars`} element={<NewCar />} />
        <Route path={`/${currCountryCode}/new-cars?:slug`} element={<NewCar />} />
        <Route path={`/${currCountryCode}/car-Info/:carId`} element={<SingleProductPage />} />
        <Route path={`/${currCountryCode}/discover`} element={<DiscoverHome />} />
        <Route path={`/${currCountryCode}/discover/:categoryName`} element={<DiscoverCategoryPage />} />
        <Route path={`/${currCountryCode}/:discoverName`} element={<SingleDiscoverNamePage token={token}/>} />
        {
          token && <Route path={`/${currCountryCode}/user/dashboard`} element={<UserDashBoard countriesData={data?.countries} token={token} />} />
        }
        <Route
          path={`/${currCountryCode}/register`}
          element={<Register handleLoginOrRegister={handleLoginOrRegister} countriesData={data?.countries} />}
        />
        <Route
          path={`/${currCountryCode}/login`}
          element={<Login handleLoginOrRegister={handleLoginOrRegister} />}
        />
        <Route path='*' element={<PageNotFound error={error || 'Page Not Found'} />} />
      </Routes>
      {
        !(
          (currentRoute.toLowerCase() === `/${currCountryCode}/login`.toLowerCase())
          ||
          (currentRoute.toLowerCase() === `/${currCountryCode}/register`.toLowerCase())
        ) &&
        <MyFooter />
      }
    </>
  );
}

export default App;
