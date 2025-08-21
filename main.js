import { LucideIcons } from './utils/icons.js';
import { AuthManager } from './utils/auth.js';
import { LinkManager } from './utils/links.js';
import { Router } from './utils/router.js';

class LinkHubApp {
  constructor() {
    this.authManager = new AuthManager();
    this.linkManager = new LinkManager();
    this.router = new Router();
    this.currentUser = null;
    
    this.init();
  }

  init() {
    this.currentUser = this.authManager.getCurrentUser();
    this.setupRouter();
    this.router.init();
  }

  setupRouter() {
    this.router.addRoute('/', () => this.renderLandingPage());
    this.router.addRoute('/login', () => this.renderLoginPage());
    this.router.addRoute('/signup', () => this.renderSignupPage());
    this.router.addRoute('/dashboard', () => this.renderDashboard());
    this.router.addRoute('/admin', () => this.renderAdminPanel());
    this.router.addRoute('/u/:username', (params) => this.renderPublicProfile(params.username));
  }

  renderLandingPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
        <!-- Header -->
        <header class="w-full py-6 px-4">
          <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-2">
              ${LucideIcons.link2}
              <span class="text-2xl font-bold text-primary-800">LinkHub</span>
            </div>
            <div class="space-x-4">
              <button onclick="window.app.router.navigate('/login')" class="btn-primary">
                ${LucideIcons.logIn} Login
              </button>
              <button onclick="window.app.router.navigate('/signup')" class="btn-secondary">
                Get Started
              </button>
            </div>
          </div>
        </header>

        <!-- Hero Section -->
        <main class="max-w-6xl mx-auto px-4 py-16">
          <div class="text-center mb-16">
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              One Link,
              <span class="text-primary-600">Endless Possibilities</span>
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up">
              Create your personalized link in bio page. Share all your social media, websites, and content in one beautiful, customizable link.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onclick="window.app.router.navigate('/signup')" class="btn-primary text-lg px-8 py-3 animate-bounce-gentle">
                Create Your LinkHub
              </button>
              <button onclick="window.app.router.navigate('/login')" class="btn-secondary text-lg px-8 py-3">
                ${LucideIcons.logIn} Sign In
              </button>
            </div>
          </div>

          <!-- Demo Credentials -->
          <div class="max-w-2xl mx-auto mb-16">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold mb-4 text-center">🚀 Try Demo Accounts</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-blue-50 rounded-lg p-4">
                  <h4 class="font-medium text-blue-900 mb-2">👑 Admin Account</h4>
                  <p class="text-sm text-blue-700 mb-2">Username: <code class="bg-blue-100 px-2 py-1 rounded">admin</code></p>
                  <p class="text-sm text-blue-700 mb-3">Password: <code class="bg-blue-100 px-2 py-1 rounded">admin</code></p>
                  <button onclick="window.app.quickLogin('admin', 'admin')" class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Quick Login
                  </button>
                </div>
                <div class="bg-green-50 rounded-lg p-4">
                  <h4 class="font-medium text-green-900 mb-2">👤 User Account</h4>
                  <p class="text-sm text-green-700 mb-2">Username: <code class="bg-green-100 px-2 py-1 rounded">user</code></p>
                  <p class="text-sm text-green-700 mb-3">Password: <code class="bg-green-100 px-2 py-1 rounded">user</code></p>
                  <button onclick="window.app.quickLogin('user', 'user')" class="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Quick Login
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <div class="card text-center animate-slide-up">
              ${LucideIcons.zap}
              <h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p class="text-gray-600">Set up your link in bio page in under 2 minutes. No coding required.</p>
            </div>
            <div class="card text-center animate-slide-up" style="animation-delay: 0.1s">
              ${LucideIcons.palette}
              <h3 class="text-xl font-semibold mb-2">Fully Customizable</h3>
              <p class="text-gray-600">Personalize your page with custom themes, colors, and layouts.</p>
            </div>
            <div class="card text-center animate-slide-up" style="animation-delay: 0.2s">
              ${LucideIcons.smartphone}
              <h3 class="text-xl font-semibold mb-2">Mobile Optimized</h3>
              <p class="text-gray-600">Your links look perfect on every device, from mobile to desktop.</p>
            </div>
          </div>

          <!-- Demo Preview -->
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">See it in action</h2>
            <div class="max-w-sm mx-auto bg-white rounded-2xl shadow-xl p-6 border">
              <div class="text-center mb-6">
                <div class="w-20 h-20 bg-gradient-to-r from-primary-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  DU
                </div>
                <h3 class="text-xl font-semibold">@user</h3>
                <p class="text-gray-600">Demo User Account</p>
              </div>
              <div class="space-y-3">
                <div class="link-card flex items-center space-x-3">
                  ${LucideIcons.instagram}
                  <span>My Instagram</span>
                </div>
                <div class="link-card flex items-center space-x-3">
                  ${LucideIcons.youtube}
                  <span>YouTube Channel</span>
                </div>
                <div class="link-card flex items-center space-x-3">
                  ${LucideIcons.globe}
                  <span>Personal Website</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;
  }

  renderLoginPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center px-4">
        <div class="max-w-md w-full">
          <div class="text-center mb-8">
            <div class="flex items-center justify-center space-x-2 mb-4">
              ${LucideIcons.link2}
              <span class="text-2xl font-bold text-primary-800">LinkHub</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p class="text-gray-600">Sign in to your account</p>
          </div>

          <div class="card">
            <form id="loginForm">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email or Username</label>
                <input type="text" id="emailOrUsername" required class="input-field" placeholder="admin or user@email.com">
              </div>
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" id="password" required class="input-field" placeholder="••••••••">
              </div>
              <button type="submit" class="btn-primary w-full mb-4">
                ${LucideIcons.logIn} Sign In
              </button>
            </form>

            <!-- Quick Login Buttons -->
            <div class="mb-4">
              <p class="text-sm text-gray-600 text-center mb-3">Quick Demo Login:</p>
              <div class="grid grid-cols-2 gap-2">
                <button onclick="window.app.quickLogin('admin', 'admin')" class="text-sm bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200">
                  Admin Demo
                </button>
                <button onclick="window.app.quickLogin('user', 'user')" class="text-sm bg-green-100 text-green-700 px-3 py-2 rounded hover:bg-green-200">
                  User Demo
                </button>
              </div>
            </div>
            
            <div class="text-center">
              <p class="text-gray-600">
                Don't have an account? 
                <button onclick="window.app.router.navigate('/signup')" class="text-primary-600 hover:text-primary-800 font-medium">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const emailOrUsername = document.getElementById('emailOrUsername').value;
      const password = document.getElementById('password').value;
      
      if (this.authManager.login(emailOrUsername, password)) {
        this.currentUser = this.authManager.getCurrentUser();
        if (this.currentUser.role === 'admin') {
          this.router.navigate('/admin');
        } else {
          this.router.navigate('/dashboard');
        }
      } else {
        alert('Invalid credentials');
      }
    });
  }

  renderSignupPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center px-4">
        <div class="max-w-md w-full">
          <div class="text-center mb-8">
            <div class="flex items-center justify-center space-x-2 mb-4">
              ${LucideIcons.link2}
              <span class="text-2xl font-bold text-primary-800">LinkHub</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p class="text-gray-600">Join thousands of creators</p>
          </div>

          <div class="card">
            <form id="signupForm">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" id="fullName" required class="input-field" placeholder="John Doe">
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <div class="relative">
                  <span class="absolute left-3 top-2 text-gray-500">@</span>
                  <input type="text" id="username" required class="input-field pl-8" placeholder="johndoe">
                </div>
                <p class="text-xs text-gray-500 mt-1">Your unique LinkHub URL: linkhub.com/u/username</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" id="email" required class="input-field" placeholder="your@email.com">
              </div>
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" id="password" required class="input-field" placeholder="••••••••">
              </div>
              <button type="submit" class="btn-primary w-full mb-4">
                Create Account
              </button>
            </form>
            
            <div class="text-center">
              <p class="text-gray-600">
                Already have an account? 
                <button onclick="window.app.router.navigate('/login')" class="text-primary-600 hover:text-primary-800 font-medium">
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('signupForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('fullName').value;
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (this.authManager.register(fullName, username, email, password)) {
        this.currentUser = this.authManager.getCurrentUser();
        this.router.navigate('/dashboard');
      } else {
        alert('Registration failed. Username or email might already exist.');
      }
    });
  }

  renderDashboard() {
    if (!this.currentUser) {
      this.router.navigate('/login');
      return;
    }

    const userLinks = this.linkManager.getUserLinks(this.currentUser.id);
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
          <div class="max-w-6xl mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                ${LucideIcons.link2}
                <span class="text-xl font-bold text-primary-800">LinkHub</span>
              </div>
              <div class="flex items-center space-x-4">
                ${this.currentUser.role === 'admin' ? `
                  <button onclick="window.app.router.navigate('/admin')" class="btn-secondary text-sm">
                    ${LucideIcons.settings} Admin Panel
                  </button>
                ` : ''}
                <span class="text-gray-600">Hi, ${this.currentUser.fullName}</span>
                <button onclick="window.app.logout()" class="text-gray-500 hover:text-gray-700">
                  ${LucideIcons.logOut}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div class="max-w-4xl mx-auto px-4 py-8">
          <div class="grid lg:grid-cols-2 gap-8">
            <!-- Left Panel - Dashboard -->
            <div>
              <div class="mb-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Your Dashboard</h1>
                <p class="text-gray-600">Manage your links and customize your profile</p>
              </div>

              <!-- Profile Info -->
              <div class="card mb-6">
                <h2 class="text-xl font-semibold mb-4">Profile Information</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                    <input type="text" value="${this.currentUser.fullName}" class="input-field" id="displayName">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea class="input-field" rows="3" placeholder="Tell people about yourself..." id="bio">${this.currentUser.bio || ''}</textarea>
                  </div>
                  <button onclick="window.app.updateProfile()" class="btn-primary">
                    Save Profile
                  </button>
                </div>
              </div>

              <!-- Your Link -->
              <div class="card mb-6">
                <h2 class="text-xl font-semibold mb-4">Your LinkHub URL</h2>
                <div class="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg">
                  <span class="text-primary-600 font-medium">linkhub.com/u/${this.currentUser.username}</span>
                  <button onclick="window.app.copyLink()" class="text-gray-500 hover:text-gray-700">
                    ${LucideIcons.copy}
                  </button>
                </div>
                <div class="mt-2 space-x-2">
                  <button onclick="window.app.router.navigate('/u/${this.currentUser.username}')" class="text-primary-600 hover:text-primary-800 text-sm">
                    View Public Page
                  </button>
                </div>
              </div>

              <!-- Add Link Form -->
              <div class="card">
                <h2 class="text-xl font-semibold mb-4">Add New Link</h2>
                <form id="addLinkForm">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <select id="platform" class="input-field">
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="website">Website</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input type="text" id="linkTitle" required class="input-field" placeholder="My Instagram">
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">URL</label>
                    <input type="url" id="linkUrl" required class="input-field" placeholder="https://instagram.com/username">
                  </div>
                  <button type="submit" class="btn-primary w-full">
                    Add Link
                  </button>
                </form>
              </div>
            </div>

            <!-- Right Panel - Links List -->
            <div>
              <h2 class="text-xl font-semibold mb-4">Your Links (${userLinks.length})</h2>
              <div class="space-y-3" id="linksList">
                ${userLinks.map(link => `
                  <div class="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      ${this.getPlatformIcon(link.platform)}
                      <div>
                        <h3 class="font-medium">${link.title}</h3>
                        <p class="text-sm text-gray-500">${link.url}</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button onclick="window.app.toggleLink('${link.id}')" class="text-gray-500 hover:text-gray-700">
                        ${link.active ? LucideIcons.eye : LucideIcons.eyeOff}
                      </button>
                      <button onclick="window.app.deleteLink('${link.id}')" class="text-red-500 hover:text-red-700">
                        ${LucideIcons.trash}
                      </button>
                    </div>
                  </div>
                `).join('')}
                
                ${userLinks.length === 0 ? `
                  <div class="text-center py-8 text-gray-500">
                    <p>No links added yet. Add your first link to get started!</p>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add event listener for add link form
    document.getElementById('addLinkForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const platform = document.getElementById('platform').value;
      const title = document.getElementById('linkTitle').value;
      const url = document.getElementById('linkUrl').value;
      
      this.linkManager.addLink(this.currentUser.id, {
        platform,
        title,
        url
      });
      
      // Refresh dashboard
      this.renderDashboard();
    });
  }

  renderAdminPanel() {
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      this.router.navigate('/login');
      return;
    }

    const allUsers = this.authManager.getAllUsers();
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
          <div class="max-w-6xl mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                ${LucideIcons.link2}
                <span class="text-xl font-bold text-primary-800">LinkHub Admin</span>
              </div>
              <div class="flex items-center space-x-4">
                <button onclick="window.app.router.navigate('/dashboard')" class="btn-secondary text-sm">
                  ${LucideIcons.user} My Dashboard
                </button>
                <span class="text-gray-600">Admin: ${this.currentUser.fullName}</span>
                <button onclick="window.app.logout()" class="text-gray-500 hover:text-gray-700">
                  ${LucideIcons.logOut}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div class="max-w-6xl mx-auto px-4 py-8">
          <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p class="text-gray-600">Manage users and system settings</p>
          </div>

          <!-- Stats -->
          <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="card text-center">
              <div class="text-2xl font-bold text-primary-600">${allUsers.length}</div>
              <div class="text-gray-600">Total Users</div>
            </div>
            <div class="card text-center">
              <div class="text-2xl font-bold text-green-600">${allUsers.filter(u => u.role === 'user').length}</div>
              <div class="text-gray-600">Regular Users</div>
            </div>
            <div class="card text-center">
              <div class="text-2xl font-bold text-blue-600">${allUsers.filter(u => u.role === 'admin').length}</div>
              <div class="text-gray-600">Administrators</div>
            </div>
            <div class="card text-center">
              <div class="text-2xl font-bold text-purple-600">${this.linkManager.getLinks().length}</div>
              <div class="text-gray-600">Total Links</div>
            </div>
          </div>

          <!-- Users Table -->
          <div class="card">
            <h2 class="text-xl font-semibold mb-4">All Users</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">User</th>
                    <th class="text-left py-3 px-4">Username</th>
                    <th class="text-left py-3 px-4">Email</th>
                    <th class="text-left py-3 px-4">Role</th>
                    <th class="text-left py-3 px-4">Links</th>
                    <th class="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${allUsers.map(user => {
                    const userLinks = this.linkManager.getUserLinks(user.id);
                    return `
                      <tr class="border-b hover:bg-gray-50">
                        <td class="py-3 px-4">
                          <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-r from-primary-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              ${user.fullName.split(' ').map(name => name[0]).join('').toUpperCase()}
                            </div>
                            <div>
                              <div class="font-medium">${user.fullName}</div>
                              <div class="text-sm text-gray-500">Joined ${new Date(user.createdAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </td>
                        <td class="py-3 px-4">@${user.username}</td>
                        <td class="py-3 px-4">${user.email}</td>
                        <td class="py-3 px-4">
                          <span class="px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                            ${user.role}
                          </span>
                        </td>
                        <td class="py-3 px-4">${userLinks.length}</td>
                        <td class="py-3 px-4">
                          <div class="flex items-center space-x-2">
                            <button onclick="window.app.router.navigate('/u/${user.username}')" class="text-primary-600 hover:text-primary-800 text-sm">
                              View Profile
                            </button>
                            ${user.id !== this.currentUser.id ? `
                              <button onclick="window.app.deleteUser('${user.id}')" class="text-red-500 hover:text-red-700 text-sm">
                                Delete
                              </button>
                            ` : ''}
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderPublicProfile(username) {
    const user = this.authManager.getUserByUsername(username);
    if (!user) {
      const app = document.getElementById('app');
      app.innerHTML = `
        <div class="min-h-screen bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p class="text-gray-600 mb-8">User not found</p>
            <button onclick="window.app.router.navigate('/')" class="btn-primary">
              Go Home
            </button>
          </div>
        </div>
      `;
      return;
    }

    const userLinks = this.linkManager.getUserLinks(user.id).filter(link => link.active);
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
        <div class="max-w-md mx-auto px-4 py-8">
          <!-- Profile Header -->
          <div class="text-center mb-8">
            <div class="w-24 h-24 bg-gradient-to-r from-primary-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              ${user.fullName.split(' ').map(name => name[0]).join('').toUpperCase()}
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-1">@${user.username}</h1>
            <h2 class="text-lg text-gray-700 mb-2">${user.fullName}</h2>
            ${user.bio ? `<p class="text-gray-600">${user.bio}</p>` : ''}
          </div>

          <!-- Links -->
          <div class="space-y-4">
            ${userLinks.map(link => `
              <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
                 class="block bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:scale-105">
                <div class="flex items-center space-x-4">
                  ${this.getPlatformIcon(link.platform)}
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-900">${link.title}</h3>
                  </div>
                  <div class="text-gray-400">
                    ${LucideIcons.externalLink}
                  </div>
                </div>
              </a>
            `).join('')}
            
            ${userLinks.length === 0 ? `
              <div class="text-center py-8 text-gray-500">
                <p>No links available yet</p>
              </div>
            ` : ''}
          </div>

          <!-- Footer -->
          <div class="text-center mt-12">
            <p class="text-gray-500 text-sm mb-2">Created with</p>
            <button onclick="window.app.router.navigate('/')" class="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800">
              ${LucideIcons.link2}
              <span class="font-semibold">LinkHub</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  getPlatformIcon(platform) {
    const icons = {
      instagram: LucideIcons.instagram,
      twitter: LucideIcons.twitter,
      youtube: LucideIcons.youtube,
      tiktok: LucideIcons.music,
      linkedin: LucideIcons.linkedin,
      website: LucideIcons.globe,
      custom: LucideIcons.link
    };
    return icons[platform] || LucideIcons.link;
  }

  quickLogin(username, password) {
    if (this.authManager.login(username, password)) {
      this.currentUser = this.authManager.getCurrentUser();
      if (this.currentUser.role === 'admin') {
        this.router.navigate('/admin');
      } else {
        this.router.navigate('/dashboard');
      }
    }
  }

  updateProfile() {
    const displayName = document.getElementById('displayName').value;
    const bio = document.getElementById('bio').value;
    
    this.authManager.updateUser(this.currentUser.id, { fullName: displayName, bio });
    this.currentUser = this.authManager.getCurrentUser();
    alert('Profile updated successfully!');
  }

  copyLink() {
    const url = `${window.location.origin}/u/${this.currentUser.username}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  }

  toggleLink(linkId) {
    this.linkManager.toggleLink(linkId);
    this.renderDashboard();
  }

  deleteLink(linkId) {
    if (confirm('Are you sure you want to delete this link?')) {
      this.linkManager.deleteLink(linkId);
      this.renderDashboard();
    }
  }

  deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.authManager.deleteUser(userId);
      // Also delete user's links
      const userLinks = this.linkManager.getUserLinks(userId);
      userLinks.forEach(link => this.linkManager.deleteLink(link.id));
      this.renderAdminPanel();
    }
  }

  logout() {
    this.authManager.logout();
    this.currentUser = null;
    this.router.navigate('/');
  }
}

// Initialize app
window.app = new LinkHubApp();
