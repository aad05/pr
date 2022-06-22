import ReactDOM from 'react-dom/client';
import Root from './root';
import { BrowserRouter } from 'react-router-dom';
import { User } from './context/userData';
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <User>
      <Root />
    </User>
  </BrowserRouter>
);
