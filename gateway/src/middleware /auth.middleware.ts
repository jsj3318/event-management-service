import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_RULES } from '../access-map';
import * as jwt from 'jsonwebtoken';

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

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req['userId'] = decoded;

            // ADMIN role은 통과
            if(decoded.role === 'ADMIN') return next();

            if (!matched.roles.includes(decoded.role)) {
                throw new ForbiddenException('forbidden');
            }

            next();
        } catch (e) {
            throw new UnauthorizedException('wrong token!');
        }
    }

}
