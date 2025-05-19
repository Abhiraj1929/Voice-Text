import React, { useState, useEffect, useRef } from 'react';

import '../App.css';

const VoiceToText = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const recognitionRef = useRef(null);
  const [isChrome, setIsChrome] = useState(true);


  
  useEffect(() => {
    // Check if browser is Chrome
    setIsChrome(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor));
    
    // Load voices when they become available
    const handleVoicesChanged = () => {
      // This is needed to ensure voices are loaded
    };
    
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const startRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome.');
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = language;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
      speakText(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);
    }
  };

  const toggleRecognition = () => {
    if (isListening) {
      stopRecognition();
    } else {
      startRecognition();
    }
  };

  const speakText = (textToSpeak) => {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language;
    
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.lang.startsWith(language));
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    switch(language) {
      case 'pa-IN':
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        break;
      case 'ko-KR':
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        break;
      case 'zh-CN':
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        break;
      case 'ar-SA':
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        break;
      default:
        utterance.rate = 1;
        utterance.pitch = 1;
    }
    
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="container">
      <h1>Voice to Text</h1>
      <textarea 
        id="in" 
        placeholder="Your speech will appear here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="button-container">
        <select 
          id="languageSelect"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en-US">English</option>
          <option value="es-ES">Spanish</option>
          <option value="hi-IN">Hindi</option>
          <option value="ko-KR">Korean</option>
        </select>
        {isChrome ? (
          <button 
            id="rec" 
            className={isListening ? 'listening' : ''}
            onClick={toggleRecognition}
          >
            <svg className="mic-icon" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h-2c0 5.32 4.14 9.61 9 9.95v4.05h2v-4.05c4.86-.34 9-4.63 9-9.95h-2c0 4.08-3.06 7.44-7 7.93z"/>
            </svg>
            <span>{isListening ? 'Listening...' : 'Start Listening'}</span>
          </button>
        ) : (
          <p className="browser-warning">
            Voice input only works in Chrome browser
          </p>
        )}
      </div>
      <div className="footer">
        Created by students of Jharkhand Rai university © 2025
      </div>
    </div>
  );
};

export default VoiceToText;