import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './About';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  }



  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              path="/"
              element={<BestBooks />}>
            </Route>
            <Route 
              path="/About"
              element={<About />}>
            </Route>
            
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
