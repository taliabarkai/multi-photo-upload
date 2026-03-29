import { Outlet } from 'react-router';
import { UploadProvider } from './contexts/UploadContext';

export default function Root() {
  return (
    <UploadProvider>
      <Outlet />
    </UploadProvider>
  );
}
