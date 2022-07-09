import './App.css';

import ListOwner from './components/ListOwner';
import CreateOwner from './components/CreateOwner';
import Header from './components/Header';
import Footer from './components/Footer';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div>
        <Router>
              <Header />
                <div className="container">
                    <Routes> 
                          <Route path = "/" exact component = {ListOwner}></Route>
                          <Route path = "/owner" component = {ListOwner}></Route>
                          <Route path = "/add-owner/:id" component = {CreateOwner}></Route>
                          
                          {/* <Route path = "/update-owners/:id" component = {UpdateOwner}></Route>  */}
                    </Routes>
                </div>
              <Footer />
        </Router>
    </div>
    
  );
}
export default App;
