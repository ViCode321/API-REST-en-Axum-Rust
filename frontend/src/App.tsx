
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="p-3 mb-2 text-white">
      <Outlet />
    </div>
  );
};

export default App;