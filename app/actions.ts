"use server"

import prisma from "@/lib/prisma";
import { error } from "console";
import { randomBytes } from "crypto";

export async function checkAddUser(email: string, name: string) {
    if (!email) return
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!existingUser && name) {
            await prisma.user.create({
                data: {
                    email,
                    name
                }
            });
        }


    } catch (error) {
        console.error("Erreur lors de la validation de l'utilisateur:", error);
    }
}
function generateUniqueCode(): string {
    return randomBytes(6).toString('hex')
}
export async function createProject(name: string, description: string, email: string) {
    try {
        const inviteCode = generateUniqueCode()
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error('user not found');
        }
        const newProject = await prisma.projet.create({
            data: {
                name, description, inviteCode, createdById: user.id
            }
        })
        return newProject;
    } catch (error) {
        console.error(error)
        throw new Error
    }

}
