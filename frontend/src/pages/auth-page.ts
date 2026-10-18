class AuthPage extends HTMLElement {
  private mode: 'login' | 'signup' = 'login';

  connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    this.mode = (urlParams.get('mode') as 'login' | 'signup') || 'login';
    this.render();
  }

  render() {
    const isLogin = this.mode === 'login';
    
    this.innerHTML = `
      <div class="auth-page">
        <form class="auth-form-ish" id="auth-form">
          <h2>${isLogin ? 'Login' : 'Sign Up'}</h2>
          
          ${!isLogin ? `
            <div class="form-group">
              <label for="displayName">Name</label>
              <input type="text" id="displayName" name="displayName" required />
            </div>
          ` : ''}

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <button type="submit">${isLogin ? 'Login' : 'Sign Up'}</button>
          <p class="error" id="error"></p>
          
          <p class="auth-toggle">
            ${isLogin 
              ? 'Don\'t have an account? <a href="/?mode=signup" data-link>Sign up</a>'
              : 'Already have an account? <a href="/?mode=login" data-link>Login</a>'
            }
          </p>
        </form>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    const form = this.querySelector('#auth-form') as HTMLFormElement;
    const errorEl = this.querySelector('#error') as HTMLParagraphElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorEl.textContent = '';

      const formData = new FormData(form);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        if (this.mode === 'signup') {
          const displayName = formData.get('displayName') as string;
          const { signup } = await import('../services/auth-service');
          await signup(email, password, displayName);
        } else {
          const { login } = await import('../services/auth-service');
          await login(email, password);
        }
        // Router will handle redirect via auth state change
      } catch (error: any) {
        errorEl.textContent = error.message;
      }
    });
  }
}

customElements.define('auth-page', AuthPage);
