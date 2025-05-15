import {Role} from "./type/role.enum";

export const ACCESS_RULES = [
    // ADMIN 은 미들웨어에서 반드시 통과

    // auth server
    { method: 'GET', path: /^\/auth\/?$/, roles: [] },

    { method: 'GET', path: /^\/auth\/me$/, roles: [Role.USER, Role.AUDITOR, Role.OPERATOR, Role.ADMIN] },


    // event server
    { method: 'GET', path: /^\/event\/?$/, roles: [Role.USER] },

    { method: 'POST', path: /^\/event\/admin\/create$/, roles: [Role.ADMIN] },
    { method: 'GET', path: /^\/event\/rewards$/, roles: [Role.USER] },


];
