export class AuthManager {
  constructor() {
    this.storageKey = 'linkhub_users';
    this.currentUserKey = 'linkhub_current_user';
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      // Create default users
      const defaultUsers = [
        {
          id: 'admin_001',
          fullName: 'Administrator',
          username: 'admin',
          email: 'admin',
          password: 'admin',
          bio: 'System Administrator',
          role: 'admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'user_001',
          fullName: 'Demo User',
          username: 'user',
          email: 'user',
          password: 'user',
          bio: 'Demo User Account',
          role: 'user',
          createdAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
      
      // Add some demo links for the demo user
      const demoLinks = [
        {
          id: 'link_001',
          userId: 'user_001',
          platform: 'instagram',
          title: 'My Instagram',
          url: 'https://instagram.com/demouser',
          active: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'link_002',
          userId: 'user_001',
          platform: 'youtube',
          title: 'YouTube Channel',
          url: 'https://youtube.com/c/demouser',
          active: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'link_003',
          userId: 'user_001',
          platform: 'website',
          title: 'Personal Website',
          url: 'https://demouser.com',
          active: true,
          createdAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem('linkhub_links', JSON.stringify(demoLinks));
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveUsers(users) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  register(fullName, username, email, password) {
    const users = this.getUsers();
    
    // Check if username or email already exists
    if (users.some(user => user.username === username || user.email === email)) {
      return false;
    }

    const newUser = {
      id: this.generateId(),
      fullName,
      username,
      email,
      password, // In real app, this should be hashed
      bio: '',
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    
    // Auto login after registration
    localStorage.setItem(this.currentUserKey, JSON.stringify(newUser));
    
    return true;
  }

  login(emailOrUsername, password) {
    const users = this.getUsers();
    const user = users.find(u => 
      (u.email === emailOrUsername || u.username === emailOrUsername) && 
      u.password === password
    );
    
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    
    return false;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser() {
    const userData = localStorage.getItem(this.currentUserKey);
    return userData ? JSON.parse(userData) : null;
  }

  getUserByUsername(username) {
    const users = this.getUsers();
    return users.find(user => user.username === username);
  }

  updateUser(userId, updates) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      this.saveUsers(users);
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(this.currentUserKey, JSON.stringify(users[userIndex]));
      }
    }
  }

  getAllUsers() {
    return this.getUsers();
  }

  deleteUser(userId) {
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    this.saveUsers(filteredUsers);
    return true;
  }
}
