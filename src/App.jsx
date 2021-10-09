import Converter from "./components/Converter";

function App() {
  return (
    <div className="App">
      <main>
        <header className="contentContainer">
          <h1>The</h1>
          <h1 className="pink">Currency</h1>
          <h1>Converter</h1>
        </header>
        <Converter />
      </main>
    </div>
  );
}

export default App;
