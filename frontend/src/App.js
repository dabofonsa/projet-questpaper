import React, { useEffect } from "react";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Profile from "./Pages/Profile";
import Upload from "./Pages/Upload";
import Offers from "./Pages/Offers";
import CookieConsent from "react-cookie-consent";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { situation } from "../src/features/Login";
import { useDispatch } from "react-redux";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Secondary from "./Pages/Secondary";
import Membership from "./Pages/Membership";
import Success from "./Pages/Success";
import Failed from "./Pages/Failed";
import NotFound from "./Pages/NotFound";
import Corriger from "./Pages/Corriger";
import Consultation from "./Pages/Consultation";
import Uploadcore from "./Pages/Uploadcore";
import { isExpired, decodeToken } from "react-jwt";
const token = localStorage.getItem("questoken");
//import Cookies from 'js-cookie';

function App() {
  const isMyTokenExpired = isExpired(token);
  const loginStatus = useSelector((state) => state.login.value);

  const dispatch = useDispatch();
  let history = useHistory();

  const location = useLocation();

  useEffect(async() => {
   // console.log(isMyTokenExpired);
    //const token = localStorage.getItem("token");
    const conf = await isMyTokenExpired;

 console.log(conf)
    if (token) {

      dispatch(situation(true));
      history.push(location.pathname);
    } else {
      dispatch(situation(false));
    }
  }, []);

  // useEffect(() =>{
  //   const cookie = Cookies.get('loggedIn')
  //   if(cookie){
  //     dispatch(situation(true));
  //     history.push(location.pathname)
  //   }else{
  //     dispatch(situation(false));
  //   }
  // },[])

  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Registration} />
        <ProtectedRoute
          exact
          path="/profile"
          isAuth={loginStatus}
          component={Profile}
        />
        <ProtectedRoute
          exact
          path="/upload"
          isAuth={loginStatus}
          component={Upload}
        />
        <ProtectedRoute
          exact
          path="/offers"
          isAuth={loginStatus}
          component={Offers}
        />
        <ProtectedRoute
          exact
          path="/secondary"
          isAuth={loginStatus}
          component={Secondary}
        />
        <ProtectedRoute
          exact
          path="/membership"
          isAuth={loginStatus}
          component={Membership}
        />
        <ProtectedRoute
          exact
          path="/success"
          isAuth={loginStatus}
          component={Success}
        />
        <ProtectedRoute
          exact
          path="/failed"
          isAuth={loginStatus}
          component={Failed}
        />
        <ProtectedRoute
          exact
          path="/corriger"
          isAuth={loginStatus}
          component={Corriger}
        />
        <ProtectedRoute
          exact
          path="/consultation"
          isAuth={loginStatus}
          component={Consultation}
        />
        <ProtectedRoute
          exact
          path="/upcorriger"
          isAuth={loginStatus}
          component={Uploadcore}
        />
        <Route component={NotFound} />
      </Switch>
      <CookieConsent
        location="bottom"
        style={{ background: "#2B373B" }}
        buttonText="Je Comprends !"
        debug={true}
      >
        Ce site utillise des cookies pour une meilleur experience utillisateurs.
      </CookieConsent>
      <Footer />
    </>
  );
}

export default App;
