import type Router from '../router';

export function requireAuth(
  router: Router,
  isAuthenticated: boolean | null,
  renderFn: () => void
) {
  if (isAuthenticated === null) {
    router.render('<p>Indlæser…</p>');
    return;
  }
  if (!isAuthenticated) {
    router.navigate('/');
    return;
  }
  renderFn();
}