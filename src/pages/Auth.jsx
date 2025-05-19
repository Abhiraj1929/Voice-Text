import { SignIn, SignUp } from '@clerk/clerk-react';
import { Routes, Route, Navigate, Link } from 'react-router';
import './Auth.module.css'; // Make sure this import path is correct

export default function Auth() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome to VoiceToText</h2>
          <p>Please sign in or create an account</p>
        </div>
        
        <div className="auth-tabs">
          <Link 
            to="/auth/sign-in" 
            className={({ isActive }) => 
              `auth-tab ${isActive ? 'active-tab' : ''}`
            }
          >
            Sign In
          </Link>
          <Link 
            to="/auth/sign-up" 
            className={({ isActive }) => 
              `auth-tab ${isActive ? 'active-tab' : ''}`
            }
          >
            Sign Up
          </Link>
        </div>

        <div className="auth-content">
          <Routes>
            <Route path="sign-in" element={<SignIn routing="path" path="/auth/sign-in" />} />
            <Route path="sign-up" element={<SignUp routing="path" path="/auth/sign-up" />} />
            <Route path="*" element={<Navigate to="/auth/sign-in" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}