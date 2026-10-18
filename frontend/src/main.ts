import './styles/global.css';
import './components/header/header';
import './pages/auth-page';
import './pages/profile-page';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Router from './router';
import { requireAuth } from './utils/route-guards';

let isAuthenticated: boolean | null = null; // null = Firebase har ikke svaret endnu

const router = new Router('app');

router.on('/', () => {
  if (isAuthenticated) {
    router.navigate('/profile'); // allerede logget ind, ingen grund til at se login-siden
    return;
  }
  if (isAuthenticated === null) {
    router.render('<p>Indlæser…</p>');
    return;
  }
  router.render('<auth-page></auth-page>');
});

router.on('/profile', () => {
  requireAuth(router, isAuthenticated, () => {
    router.render('<profile-page></profile-page>');
  });
});

router.start(); // viser "Indlæser…" med det samme, mens Firebase svarer

onAuthStateChanged(auth, (user) => {
  isAuthenticated = !!user;
  console.log(user ? `User logged in: ${user.email}` : 'User logged out');
  router.start(); // kør routing-logikken igen for den aktuelle sti, nu med kendt auth-status
});