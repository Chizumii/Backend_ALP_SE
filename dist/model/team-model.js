"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamResponse = void 0;
const TeamResponse = (prismaTeam) => {
    return {
        TeamId: prismaTeam.TeamId,
        namatim: prismaTeam.namatim,
        image: prismaTeam.image,
    };
};
exports.TeamResponse = TeamResponse;
