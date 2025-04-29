import "./App.css";
import Feed from "./components/Feed";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>My Simple Feed</h1>
      </header>
      <main className="app-main">
        <Feed />
      </main>
    </div>
  );
}

export default App;
