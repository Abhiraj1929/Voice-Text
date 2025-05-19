import { SignInButton } from '@clerk/clerk-react';
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Welcome to VoiceToText</h1>
      
      <SignInButton afterSignInUrl="/dashboard" />
      <button onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>
    </div>
  );
}