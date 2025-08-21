export class LinkManager {
  constructor() {
    this.storageKey = 'linkhub_links';
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getLinks() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveLinks(links) {
    localStorage.setItem(this.storageKey, JSON.stringify(links));
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  addLink(userId, linkData) {
    const links = this.getLinks();
    
    const newLink = {
      id: this.generateId(),
      userId,
      platform: linkData.platform,
      title: linkData.title,
      url: linkData.url,
      active: true,
      createdAt: new Date().toISOString()
    };

    links.push(newLink);
    this.saveLinks(links);
    
    return newLink;
  }

  getUserLinks(userId) {
    const links = this.getLinks();
    return links.filter(link => link.userId === userId)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  updateLink(linkId, updates) {
    const links = this.getLinks();
    const linkIndex = links.findIndex(link => link.id === linkId);
    
    if (linkIndex !== -1) {
      links[linkIndex] = { ...links[linkIndex], ...updates };
      this.saveLinks(links);
      return true;
    }
    
    return false;
  }

  toggleLink(linkId) {
    const links = this.getLinks();
    const link = links.find(link => link.id === linkId);
    
    if (link) {
      link.active = !link.active;
      this.saveLinks(links);
      return true;
    }
    
    return false;
  }

  deleteLink(linkId) {
    const links = this.getLinks();
    const filteredLinks = links.filter(link => link.id !== linkId);
    this.saveLinks(filteredLinks);
    return true;
  }
}
