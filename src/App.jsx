import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import { Navigate, Route, Routes } from 'react-router';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<Auth />} />
      
      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}