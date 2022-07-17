import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './contexts/Theme';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NotFound from './components/NotFound';
import PhotosTest from './components/Photos';
import { useLayoutEffect } from 'react';

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/photos' element={<PhotosTest />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
