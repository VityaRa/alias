import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(userId: string): Promise<any> {
    const user = this.usersService.get(userId);
    return user ?? null;
  }
}