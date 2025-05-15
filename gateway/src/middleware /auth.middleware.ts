import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_RULES } from '../access-map';
import * as jwt from 'jsonwebtoken';
import {Role} from "../type/role.enum";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        const matched = ACCESS_RULES.find(
            rule => rule.method === req.method && rule.path.test(req.path),
        );

        // console.log('originalUrl:', req.originalUrl);
        // console.log('matched rule:', matched);

        if (!matched) throw new NotFoundException('api not found in gateway');

        if (matched.roles.length === 0) {
            return next();
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new UnauthorizedException('no token!');

        const decoded = (() => {
            try {
                return jwt.verify(token, process.env.JWT_SECRET);
            } catch {
                throw new UnauthorizedException('wrong token!');
            }
        })();

        req['userId'] = decoded;

        // ADMIN role은 통과
        if(decoded.role === Role.ADMIN) return next();

        if (!matched.roles.includes(decoded.role)) {
            throw new ForbiddenException('forbidden');
        }

        next();
    }

}
