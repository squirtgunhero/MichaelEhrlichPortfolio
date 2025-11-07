import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PlatformGalleryPage } from './pages/PlatformGalleryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery/:platform" element={<PlatformGalleryPage />} />
    </Routes>
  );
}
