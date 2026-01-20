import { login } from '../../services/auth-service';

class LoginForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.innerHTML = `
      <form class="auth-form" id="login-form">
        <h2>Login</h2>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit">Login</button>
        <p class="error" id="error"></p>
      </form>
    `;
  }

  attachEventListeners() {
    const form = this.querySelector('#login-form') as HTMLFormElement;
    const errorEl = this.querySelector('#error') as HTMLParagraphElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorEl.textContent = '';

      const formData = new FormData(form);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        await login(email, password);
        window.location.href = '/dashboard';
      } catch (error: any) {
        errorEl.textContent = error.message;
      }
    });
  }
}

customElements.define('login-form', LoginForm);