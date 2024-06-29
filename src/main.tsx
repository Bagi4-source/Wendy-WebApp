import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { createCtx, connectLogger } from '@reatom/framework';
import { reatomContext } from "@reatom/npm-react";

const ctx = createCtx();
connectLogger(ctx);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <reatomContext.Provider value={ctx}>
        <App />
      </reatomContext.Provider>
    </NextUIProvider>
  </React.StrictMode>,
);
