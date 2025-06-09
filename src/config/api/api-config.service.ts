import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config_Constants_Enum } from '../enum/api-config.enum';

@Injectable()
export class ApiConfigServices {
  constructor(private readonly configService: ConfigService) {}

  getAppDomain() {
    return (
      this.configService.get(Config_Constants_Enum.APP_DOMAIN) ||
      'http://localhost:'
    );
  }

  getPort() {
    return this.configService.get(Config_Constants_Enum.PORT) || 8800;
  }

  getVersion() {
    return this.configService.get(Config_Constants_Enum.VERSION) || '1.0';
  }
}