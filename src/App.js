import './App.css';
import {Routes,Route} from 'react-router-dom';
import {Account, Admin, Home, Login, Logout, Register, User} from './views';
import { Layout } from './ui/layout';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/register" index element={<Register />}></Route>
          <Route path="/account/validation" index element={<Account />}></Route>
          <Route path="/account/renew" index element={<Account />}></Route>
          <Route path="/login" index element={<Login />}></Route>
          <Route path="/logout" index element={<Logout />}></Route>
          <Route path="/user" index element={<User />}></Route>
          <Route path="/admin" index element={<Admin />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
