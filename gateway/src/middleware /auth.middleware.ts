import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
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

        if (!matched) throw new ForbiddenException('잘못된 요청');

        if (matched.roles.length === 0) {
            return next();
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new UnauthorizedException('토큰 없음!');

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req['userId'] = decoded;

            // ADMIN role은 통과
            if(decoded.role === 'ADMIN') return next();

            if (!matched.roles.includes(decoded.role)) {
                throw new ForbiddenException('권한 없음!');
            }

            next();
        } catch (e) {
            throw new UnauthorizedException('잘못된 토큰!');
        }
    }

}
