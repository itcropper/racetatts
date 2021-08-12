// import logo from './logo.svg';
import { Header } from './components/header';
import { useState, useEffect, useRef } from 'react';
import { Confirm } from './pages/Confirm';
import { Design } from './pages/Design';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

function App() {

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {

  }, [previewImage])

  const setImage = (image) => {
    setPreviewImage(image);
  }

  return (
    <Router basename="racetatts">
      <Header />
      <Switch>
        <Route path="/confirm">  <Confirm  imagePath={previewImage} /> </Route>
        <Route exact path="/"> <Design onSave={setImage} /> </Route>
      </Switch>
    </Router>

  );
}

export default App;
