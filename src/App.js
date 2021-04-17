import logo from './logo.svg';
import './App.css';
import NewsFeed from './components/NewsFeed';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <NewsFeed/>
    </div>
  );
}

export default App;
