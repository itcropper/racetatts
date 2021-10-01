// import logo from './logo.svg';
import { Header } from './components/header';
import { useState, useEffect, useRef } from 'react';
import { CheckoutPage  } from './pages/Checkout'
import { Confirm } from './pages/Confirm';
import { Sizing } from './pages/Sizing';
import { Design } from './pages/Design';
import { About } from './pages/About';

import { loadStripe } from "@stripe/stripe-js";

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";

function App() {

  const [previewImage, setPreviewImage] = useState(null);
  const [pubKey, setPubKey] = useState("pk_test_51JPh7EL2vSryx9lau0eKyHEVQ0FO7CZVSIZhJs1jxOYvSMD7sDB6dM4tbSjr7vQqWfTSYZSYpnqazUdQLM5IpbVB00OMb5AmSr");
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    setStripePromise(loadStripe(pubKey))
  }, [pubKey])
  //const [previewImagePath, setPreviewImagePath] = useState(new URLSearchParams(useLocation()?.search)?.get("imageId"));

  useEffect(() => {
    //setPreviewImagePath(previewImage)
  }, [previewImage])

  const setImage = (image) => {
    setPreviewImage(image);
  }


  return (
    <Router basename="racetatts">
      <Header />
      <Switch>
        <Route path="/sizing"> <Sizing /> </Route>
        <Route path="/about"> <About /> </Route>

        <Route path="/checkout"> <CheckoutPage promise={stripePromise} stripeKey={pubKey} /> </Route>
        <Route path="/confirm">  <Confirm  imagePath={previewImage} imageId={null} /> </Route>
        <Route exact path="/"> <Design onSave={setImage} /> </Route>
      </Switch>
    </Router>

  );
}

export default App;
