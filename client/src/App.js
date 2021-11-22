import './App.css';
import Header from './components/layout/Header/Header';
import Sidebar from './components/layout/Sidebar/Sidebar';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <main></main>
    </div>
  );
};

export default App;
