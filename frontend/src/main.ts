import './styles/global.css';
import './components/header/header';
import './pages/auth-page';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Check auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User logged in:', user.email);
    // route to 
  } else {
    console.log('User logged out');
  }
});