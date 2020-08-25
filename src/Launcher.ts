import { Server } from './Server/Server';

class Launcher {
  private name: string;
  private server: Server;

  constructor() {
    this.server = new Server();
  }

  public launchApp() {
    console.log('The app started');
    this.server.createServer();
  }
}

new Launcher().launchApp();
