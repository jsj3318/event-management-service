import {All, Controller, Req, Res, UseGuards} from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';
import {AccessGuard} from "../middleware/access-guard";
import {JwtAuthGuard} from "../middleware/jwt-auth-guard";
import * as process from "node:process";

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL || 'http://localhost:3100';
const EVENT_SERVER_URL = process.env.EVENT_SERVER_URL || 'http://localhost:3200';

@Controller(['auth', 'event'])
export class ProxyController {

    @UseGuards(JwtAuthGuard, AccessGuard)
    @All('*')
    async proxy(@Req() req: Request, @Res() res: Response) {

        const target =
            req.path.startsWith('/auth') ? AUTH_SERVER_URL :
            req.path.startsWith('/event') ? EVENT_SERVER_URL :
            null;

        if (!target) return res.status(404).send('Target not found');

        const fullUrl = target + req.originalUrl;

        try {
            // 헤더 설정
            const headers = req.headers;

            const config: any = {
                method: req.method,
                url: fullUrl,
                headers,
            };

            const user = (req as { user?: any }).user;
            // console.log('[ProxyController] req.user:', user);
            if (user) {
                headers['x-user-id'] = user.sub;
                headers['x-user-role'] = user.role;
            }

            headers['x-gateway-auth'] = process.env.GATEWAY_SECRET_HEADER || '';

            delete headers['authorization'];
            delete headers['Authorization'];
            delete headers['content-length'];

            // 바디 설정
            if (!['GET', 'HEAD'].includes(req.method.toUpperCase())) {
                config.data = req.body;
            }

            console.log('[ProxyController] proxy: config', config);

            const response = await axios(config);
            res.status(response.status).json(response.data);
        } catch (error) {
            const status = error.response?.status || 500;
            const data = error.response?.data || { message: 'Proxy error' };
            res.status(status).json(data);
        }
    }


}
