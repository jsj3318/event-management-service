import {Role} from "../type/role.enum";

export const ACCESS_RULES = [
    // ADMIN 은 accessGuard에서 통과

    // auth server
    { method: 'GET', path: /^\/auth\/?$/, roles: [] },

    { method: 'GET', path: /^\/auth\/me$/, roles: [Role.USER, Role.AUDITOR, Role.OPERATOR] },
    { method: 'POST', path: /^\/auth\/login$/, roles: [] },

    { method: 'GET', path: /^\/auth\/user$/, roles: [] },
    { method: 'GET', path: /^\/auth\/user\/[^\/]+$/, roles: [] },
    { method: 'POST', path: /^\/auth\/user$/, roles: [] },



    // event server
    { method: 'GET', path: /^\/event\/?$/, roles: [] },


];
