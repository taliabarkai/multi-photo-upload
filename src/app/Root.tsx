import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { UploadProvider } from './contexts/UploadContext';

const APP_TITLE = 'Multi-Photo Upload';

/** In dev, put the full local URL in the tab title so it’s easy to copy or spot. */
function DevLocalUrlTabTitle() {
  const location = useLocation();
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const url = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
    document.title = `${APP_TITLE} — ${url}`;
  }, [location.pathname, location.search, location.hash]);
  return null;
}

export default function Root() {
  return (
    <UploadProvider>
      <DevLocalUrlTabTitle />
      <Outlet />
    </UploadProvider>
  );
}
