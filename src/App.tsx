import { Navigate, Route, Routes } from 'react-router-dom';
import {
  GuestPhotoDetailPage,
  GuestPhotoGalleryPage,
  GuestPhotoUploadPage,
  WeddingInvitationPage,
} from './pages';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WeddingInvitationPage />} />
      <Route path="/guest-upload" element={<GuestPhotoUploadPage />} />
      <Route path="/guest-photos" element={<GuestPhotoGalleryPage />} />
      <Route path="/guest-photos/:uploadId" element={<GuestPhotoDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
