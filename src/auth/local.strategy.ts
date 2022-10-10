import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'; 
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
//TODO если имя вводить не верно выводит error: Cannot read properties of null (reading 'password') {"context":"ExceptionsHandler","stack":["TypeError: Cannot read properties of null (reading 'password')\n    at AuthService.validatePassword (C:\\Users\\youal\\YandexPProjects\\KupiPodariDay\\kupipodariday-backend\\src\\auth\\auth.service.ts:25:67)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at LocalStrategy.validate (C:\\Users\\youal\\YandexPProjects\\KupiPodariDay\\kupipodariday-backend\\src\\auth\\local.strategy.ts:13:18)"]}
  async validate(username: string, password: string) {
    const user = await this.authService.validatePassword(username, password);

    if (!user) {
      throw new UnauthorizedException('Неверное имя пользователя или пароль');
    }

    return user;
  }
}
