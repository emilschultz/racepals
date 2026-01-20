import { signup } from '../../services/auth-service';

class SignupForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.innerHTML = `
      <form class="auth-form" id="signup-form">
        <h2>Sign Up</h2>
        
        <div class="form-group">
          <label for="displayName">Name</label>
          <input type="text" id="displayName" name="displayName" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit">Sign Up</button>
        <p class="error" id="error"></p>
      </form>
    `;
  }

  attachEventListeners() {
    const form = this.querySelector('#signup-form') as HTMLFormElement;
    const errorEl = this.querySelector('#error') as HTMLParagraphElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorEl.textContent = '';

      const formData = new FormData(form);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const displayName = formData.get('displayName') as string;

      try {
        await signup(email, password, displayName);
        window.location.href = '/dashboard';
      } catch (error: any) {
        errorEl.textContent = error.message;
      }
    });
  }
}

customElements.define('signup-form', SignupForm);