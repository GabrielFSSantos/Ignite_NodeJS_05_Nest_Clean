import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env, envSchema } from './env'

@Injectable()
export class EnvService {
  private readonly values: Env

  constructor() {
    this.values = envSchema.parse(process.env)
  }

  get<K extends keyof Env>(key: K): Env[K] {
    return this.values[key]
  }

  // constructor(private configService: ConfigService<Env, true>) {}

  // get<T extends keyof Env>(key: T) {
  //   return this.configService.get<T>(key, { infer: true })
  // }
}
