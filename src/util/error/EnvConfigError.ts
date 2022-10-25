export default class EnvConfigError extends Error {
  constructor(missingVariables: string[]) {
    super(`missing environment variables: ${missingVariables.join(', ')}`);
  }
}
