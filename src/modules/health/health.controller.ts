import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import configuration from 'src/config/configuration';

@Controller('health')
export class HealthController {
  declare endpoint: string;

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongoose: MongooseHealthIndicator,
  ) {
    const config = configuration();

    this.endpoint = `http://${config.http.host}:${config.http.port}`;
  }

  @Get('mongoose')
  @HealthCheck()
  checkMongoose() {
    return this.health.check([async () => this.mongoose.pingCheck('mongoose')]);
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('ping:get-users', `${this.endpoint}/v1/users`),
      () =>
        this.http.responseCheck(
          'response:get-users',
          `${this.endpoint}/v1/users`,
          (res) => res.status === 200,
        ),
    ]);
  }
}
