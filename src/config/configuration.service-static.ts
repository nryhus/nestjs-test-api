import * as dotenv from 'dotenv';

export class ConfigurationService {
  constructor(private env: { [key: string]: string }) {}

  public get(key: string) {
    return this.env[key];
  }
}

dotenv.config();

export const ConfigurationServiceStatic = new ConfigurationService(process.env);
