import {Role} from "../type/role.enum";

export const ACCESS_RULES = [
    // ADMIN 은 accessGuard에서 통과

    // auth server
    { method: 'GET', path: /^\/auth\/?$/, roles: [Role.USER] },

    { method: 'GET', path: /^\/auth\/me$/, roles: [Role.USER, Role.AUDITOR, Role.OPERATOR] },


    // event server
    { method: 'GET', path: /^\/event\/?$/, roles: [] },



];
