// frontend/src/router.ts
export default class Router {
  private routes: Map<string, () => void> = new Map();
  private containerId: string;
  private currentPath: string = '';

  constructor(containerId: string) {
    this.containerId = containerId;
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.start();
    });

    // Handle link clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[data-link]');
      
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) this.navigate(href);
      }
    });
  }

  on(path: string, handler: () => void) {
    this.routes.set(path, handler);
  }

  navigate(path: string) {
    window.history.pushState({}, '', path);
    this.start();
  }

  start() {
    const path = window.location.pathname;
    this.currentPath = path;

    // Match exact routes first
    if (this.routes.has(path)) {
      this.routes.get(path)!();
      return;
    }

    // Match parameterized routes
    for (const [route, handler] of this.routes.entries()) {
      if (route.includes(':')) {
        const regex = new RegExp('^' + route.replace(/:[^\s/]+/g, '([\\w-]+)') + '$');
        if (regex.test(path)) {
          handler();
          return;
        }
      }
    }

    // 404 fallback
    this.render('<h1>404 - Page not found</h1>'); // make this a component / element / page
  }

  render(html: string) {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = html;
    }
  }

  getParams(): Record<string, string> {
    const params: Record<string, string> = {};
    
    for (const [route] of this.routes.entries()) {
      if (route.includes(':')) {
        const routeParts = route.split('/');
        const pathParts = this.currentPath.split('/');
        
        if (routeParts.length === pathParts.length) {
          routeParts.forEach((part, i) => {
            if (part.startsWith(':')) {
              const paramName = part.slice(1);
              params[paramName] = pathParts[i];
            }
          });
        }
      }
    }
    
    return params;
  }
}