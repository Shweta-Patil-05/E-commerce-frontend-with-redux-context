import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import App from './EnhancedApp';
import './style.css';
import './more.css';
import './accounts.css';
import './visuals.css';
import './polish.css';
import './advice.css';

window.addEventListener('error',event=>{
  const image=event.target;
  if(image instanceof HTMLImageElement&&!image.dataset.photoFallback){
    image.dataset.photoFallback='used';
    image.src='https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85';
  }
},true);

createRoot(document.getElementById('root')).render(<React.StrictMode><Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider></React.StrictMode>);
