import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Controller(['auth', 'event'])
export class ProxyController {
    @All('*')
    async proxy(@Req() req: Request, @Res() res: Response) {
        const target =
            req.path.startsWith('/auth') ? 'http://localhost:3100' :
                req.path.startsWith('/event') ? 'http://localhost:3200' :
                    null;

        if (!target) return res.status(404).send('Target not found');

        const cleanedPath = req.originalUrl.replace(/^\/(auth|event)/, '');
        const fullUrl = target + cleanedPath;

        try {
            const config: any = {
                method: req.method,
                url: fullUrl,
                headers: { ...req.headers, host: undefined },
            };

            if (!['get', 'head'].includes(req.method.toLowerCase())) {
                config.data = req.body;
            }

            const response = await axios(config);
            res.status(response.status).json(response.data);
        } catch (error) {
            const status = error.response?.status || 500;
            const data = error.response?.data || { message: 'Proxy error' };
            res.status(status).json(data);
        }
    }
}
