class ProfilePage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="profile-page">
        <h2>Profile Page</h2>
        <p>Welcome to your profile!</p>
      </div>
    `;
  }
}

customElements.define('profile-page', ProfilePage);