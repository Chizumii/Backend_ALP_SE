"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
function toUserResponse(prismaUser) {
    var _a, _b;
    return {
        token: (_a = prismaUser.Token) !== null && _a !== void 0 ? _a : "",
        username: prismaUser.username,
        email: prismaUser.email,
        Idgame: prismaUser.IdGame,
        role: prismaUser.role,
        image: (_b = prismaUser.image) !== null && _b !== void 0 ? _b : ""
    };
}
