import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../type/user-request";

const prisma = new PrismaClient();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const userId = req.header("X-USER-ID"); // Mengambil user ID dari header

    if (!userId) {
        res.status(401).json({
            errors: "Unauthorized",
        });
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            UserId: parseInt(userId) // Pastikan userId diubah menjadi angka
        },
    });

    if (user) {
        req.user = user;
        next();
        return;
    }

    res.status(401).json({
        errors: "Unauthorized",
    });
};
