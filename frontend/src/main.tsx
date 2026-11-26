import { createRoot } from 'react-dom/client';
import SystemCheckPage from './features/health/SystemCheckPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <SystemCheckPage />,
);