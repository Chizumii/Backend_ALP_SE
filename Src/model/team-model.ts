import { Team } from "@prisma/client";

export interface CreateTeam {
    namatim: string;
    image: Express.Multer.File;
}

export interface TeamResponse {
    TeamId: number;
    namatim: string;
    image: string;
}

export const TeamResponse = (prismaTeam: Team): TeamResponse => {
    return {
        TeamId: prismaTeam.TeamId,
        namatim: prismaTeam.namatim,
        image: prismaTeam.image,
    };
}