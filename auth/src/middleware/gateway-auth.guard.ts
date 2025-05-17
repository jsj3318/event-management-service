import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class GatewayAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const secret = request.headers['x-gateway-auth'];

        if (secret !== process.env.GATEWAY_SECRET_HEADER) {
            throw new ForbiddenException('게이트웨이 경유 요청만 허용됩니다.');
        }

        return true;
    }
}
