import { Outlet } from 'react-router';
import './App.css'
import Header from '../components/Header/Header';

function App() {
  return (
    <div className="app">
    <Header/>
      <Outlet />
    </div>
  );
}

export default App;