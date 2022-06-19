import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Photos from './components/Photos';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './contexts/Theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const imagesData = require('./assets/data/image-data.json');

const shuffleArray = (arr: any[]) => {
  let i = arr.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

const r = require.context('./assets/images/gallery', false, /\.(png|jpe?g|svg)$/i);
const imageDetails = (shuffleArray(r.keys().map(r)) as string[]).map((src) => ({
  src: src,
  ...imagesData[src.substring(src.lastIndexOf('/') + 1).replace(/(\..*)(\.(png|jpe?g|svg))$/i, '$2')],
}));

const setModal = (src: string) => {
  const modal = document.getElementById('modal');
  const modalPhoto = document.getElementById('modal-photo') as HTMLImageElement;

  modalPhoto.src = src;
  if (modal) modal.style.display = 'flex';
};

const images = imageDetails.map((image) => (
  <div className='img-container'>
    <img
      src={image.src}
      alt={image.caption}
      key={image.src.substring(image.src.lastIndexOf('/') + 1).replace(/(\..*)(\.(png|jpe?g|svg))$/i, '$2')}
      loading='eager'
      onClick={() => setModal(image.src)}
    />
    <p className='img-info'>{`${image.caption} | ${image.location} | ${image.date}`}</p>
  </div>
));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/photos' element={<Photos images={images} />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
