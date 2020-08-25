import { Server } from './Server';

class Launcher {
  name: string;
  server: Server;

  constructor() {
    this.server = new Server();
  }

  launchApp() {
    console.log('The app started');
    this.server.createServer();
  }
}

new Launcher().launchApp();
