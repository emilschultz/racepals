// frontend/src/pages/profile-page.ts
import { getCurrentUser } from '../services/user-service';
import { logout } from '../services/auth-service';
import './profile-page.css';

class ProfilePage extends HTMLElement {
  connectedCallback() {
    this.renderLoading();
    this.loadUser();
  }

  renderLoading() {
    this.innerHTML = `<div class="profile-page"><p>Indlæser profil…</p></div>`;
  }

  async loadUser() {
    try {
      const user = await getCurrentUser();

      if (!user) {
        this.innerHTML = `
          <div class="profile-page">
            <p>Vi kunne ikke finde din profil.</p>
          </div>
        `;
        return;
      }

      this.render(user);
    } catch (error) {
      this.innerHTML = `
        <div class="profile-page">
          <p class="error">Der skete en fejl: ${(error as Error).message}</p>
        </div>
      `;
    }
  }

  render(user: { displayName: string; email: string; groupIds: string[], photoUrl?: string }) {
  
    this.innerHTML = `
      <div class="profile-page">
        <img src="${user.photoUrl || 'https://via.placeholder.com/150'}" alt="Profile Picture" class="profile-picture-container">
        <div class="profile-info">
        <h2>${user.displayName || 'Din profil'}</h2>
        <p>${user.email}</p>
        <p>Du er med i ${user.groupIds?.length ?? 0} ${user.groupIds?.length === 1 ? 'gruppe' : 'grupper'}.</p>
        <button class="logout-button">Log ud</button>
      </div>
    `;
    this.querySelector('.logout-button')?.addEventListener('click', async () => {
      await logout();
    });
  }
}

customElements.define('profile-page', ProfilePage);