export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = '';
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute(path);
  }

  handleRoute(path) {
    this.currentRoute = path;
    
    // Check for parameterized routes
    for (const route in this.routes) {
      const routePattern = route.replace(/:[^\s/]+/g, '([\\w-]+)');
      const regex = new RegExp(`^${routePattern}$`);
      const match = path.match(regex);
      
      if (match) {
        const params = {};
        const paramNames = route.match(/:[^\s/]+/g);
        
        if (paramNames) {
          paramNames.forEach((param, index) => {
            const paramName = param.substring(1); // Remove the ':'
            params[paramName] = match[index + 1];
          });
        }
        
        this.routes[route](params);
        return;
      }
    }
    
    // Exact match
    if (this.routes[path]) {
      this.routes[path]();
    } else {
      // Default to home if route not found
      this.routes['/']();
    }
  }

  init() {
    // Handle initial load
    this.handleRoute(window.location.pathname);
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });
  }
}
