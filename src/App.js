import './App.css';
import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom';
const Main = React.lazy(() => import('./module/main'))



function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<h3>Loading....</h3>}>
          <div className="App">
            <Main/>
          </div>
        </Suspense>
    </BrowserRouter>
  );
}

export default App;
