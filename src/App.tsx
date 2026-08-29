import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import Home from './pages/public/Home';

export default function App() {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}
