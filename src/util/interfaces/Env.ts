
export default interface Env {
  NODE_ENV: string;
  PORT: string;
  
  isDevMode(): boolean;
  getVariable(name: string): string;
}