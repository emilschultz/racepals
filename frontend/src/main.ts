import './styles/global.css';
import './components/header/header';
import './components/login-form/loginForm';
import './components/signup-form/signupForm';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Check auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User logged in:', user.email);
  } else {
    console.log('User logged out');
  }
});