import {Role} from "../type/role.enum";

export const ACCESS_RULES = [
    // ADMIN 은 accessGuard 에서 통과

    // auth server
    { method: 'GET', path: /^\/api\/auth$/, roles: [] },

    { method: 'GET', path: /^\/api\/auth\/me$/, roles: [Role.USER, Role.AUDITOR, Role.OPERATOR] },
    { method: 'POST', path: /^\/api\/auth\/login$/, roles: [] },

    { method: 'GET', path: /^\/api\/auth\/user$/, roles: [Role.USER, Role.AUDITOR, Role.OPERATOR] },
    { method: 'GET', path: /^\/api\/auth\/user\/[^\/]+$/, roles: [Role.USER, Role.AUDITOR, Role.OPERATOR] },
    { method: 'POST', path: /^\/api\/auth\/user$/, roles: [] },



    // event server
    { method: 'GET', path: /^\/api\/event$/, roles: [] },
    { method: 'GET', path: /^\/api\/event\/[^\/]+$/, roles: [] },
    { method: 'POST', path: /^\/api\/event$/, roles: [Role.OPERATOR] },
    { method: 'PATCH', path: /^\/api\/event\/[^\/]+$/, roles: [Role.OPERATOR] },

    // 보상
    { method: 'GET', path: /^\/api\/event\/[^\/]+\/reward$/, roles: [] },
    { method: 'POST', path: /^\/api\/event\/[^\/]+\/reward$/, roles: [Role.OPERATOR] },
    { method: 'DELETE', path: /^\/api\/event\/[^\/]+\/reward\/[^\/]+$/, roles: [Role.OPERATOR] },
    { method: 'PATCH', path: /^\/api\/event\/[^\/]+\/reward\/[^\/]+$/, roles: [Role.OPERATOR] },

    // 진행도
    { method: 'GET', path: /^\/api\/event\/[^\/]+\/user\/[^\/]+\/progress$/, roles: [Role.USER] },
    { method: 'PATCH', path: /^\/api\/event\/[^\/]+\/user\/[^\/]+\/progress$/, roles: [] },

    // 보상 요청
    { method: 'POST', path: /^\/api\/event\/[^\/]+\/reward-request$/, roles: [Role.USER] },
    { method: 'GET', path: /^\/api\/event\/[^\/]+\/reward-request$/, roles: [Role.AUDITOR, Role.OPERATOR] },
    { method: 'GET', path: /^\/api\/event\/[^\/]+\/reward-request\/me$/, roles: [Role.USER] },

];
