import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    ForbiddenException, UnauthorizedException,
} from '@nestjs/common';
import { ACCESS_RULES } from './access_rules';
import {Role} from "../type/role.enum";

@Injectable()
export class AccessGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const { method, path, user } = req;

        console.log('method', method);
        console.log('path', path);
        console.log('user', user);

        const matched = ACCESS_RULES.find(
            (rule) => rule.method === method && rule.path.test(path),
        );

        // 룰 없으면 404
        if (!matched) {
            throw new NotFoundException('요청 경로가 존재하지 않습니다');
        }

        // 역할 제한 없으면 통과
        if (matched.roles.length === 0) {
            return true;
        }

        // 유저 정보 없으면 401
        if (!user || !user.role) {
            throw new UnauthorizedException('로그인이 필요합니다');
        }

        // ADMIN은 무조건 통과
        if (user.role === Role.ADMIN) {
            return true;
        }

        // 권한 없는 경우 403
        if (!matched.roles.includes(user.role)) {
            throw new ForbiddenException(
                `접근 권한 없음`,
            );
        }

        return true;
    }
}
