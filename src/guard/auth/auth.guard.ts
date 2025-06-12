import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split('Bearer ')[1];
    try {
      const verifyToken = await axios.post(
        `${process.env.AUTHENTICATION_SERVICE_BACKEND_DOMAIN}me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userId: string = verifyToken?.data?._id || '';
      const email: string = verifyToken?.data?.email || '';

      req['user'] = { userId, email };
      return !!userId;

    } catch (err) {
      console.log('error', err);
      throw new UnauthorizedException();
    }
  }
}
