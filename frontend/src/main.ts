import './styles/global.css';
import './components/header/header';
import './pages/auth-page';
import './pages/profile-page';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Router from './router';

let isAuthenticated: boolean | null = null; // null = Firebase har ikke svaret endnu

const router = new Router('app');

router.on('/', () => {
  if (isAuthenticated === null) {
    router.render('<p>Indlæser…</p>');
    return;
  }
  if (isAuthenticated) {
    router.navigate('/profile');
    return;
  }
  router.render('<auth-page></auth-page>');
});

router.on('/profile', () => {
  if (isAuthenticated === null) {
    router.render('<p>Loading...</p>'); // make skeleton loader / element / component here
    return;
  }
  if (!isAuthenticated) {
    router.navigate('/');
    return;
  }
  router.render('<profile-page></profile-page>');
});

router.start();

onAuthStateChanged(auth, (user) => {
  isAuthenticated = !!user;
  console.log(user ? `User logged in: ${user.email}` : 'User logged out');
  router.start();
});