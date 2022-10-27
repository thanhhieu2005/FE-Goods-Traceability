import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routers/index.js'
import 'antd/dist/antd.min.css'


function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {
            routes.publicRoutes.map((route, index) => {
              return <Route key={index} path = {route.path} element = {route.element} />
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
