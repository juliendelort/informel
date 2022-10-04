import React from 'react';
import { createRoot } from 'react-dom/client';
import '../public/build/bundle.js';
import { App } from './App';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <App />
);
