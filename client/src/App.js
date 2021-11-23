import './App.css';
import Header from './components/layout/Header/Header';
import Main from './components/layout/Main/Main';
import Sidebar from './components/layout/Sidebar/Sidebar';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
