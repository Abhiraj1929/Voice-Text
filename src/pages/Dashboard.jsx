import { UserButton, useUser } from '@clerk/clerk-react';
import VoiceToText from '../Components/VoiceToText';
import { useNavigate } from 'react-router';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>VoiceToText App</h1>
        <div className="user-controls">
          {user && (
            <div className="user-greeting">
              Welcome, <span className="username">{user.firstName || user.username}</span>!
            </div>
          )}
          <UserButton 
            afterSignOutUrl="/"
            signInUrl="/auth/sign-in"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-10 w-10",
                userButtonTrigger: "focus:shadow-lg"
              }
            }}
          />
        </div>
      </header>
      
      <main className="dashboard-main">
        <VoiceToText />
        
        <button 
          className="dashboard-button"
          onClick={() => navigate('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Return Home
        </button>
      </main>
    </div>
  );
}