"use server"

import prisma from "@/lib/prisma";
import { error } from "console";
import { randomBytes } from "crypto";

export async function checkAddUser(email: string, name: string) {
  if (!email) return;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email,
          name,
        },
      });

      console.log("Utilisateur créé");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la validation de l'utilisateur:",
      error
    );
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
            throw new Error("Erreur lors de la création du projet");
        }
        const newProject = await prisma.project.create({
            data: {
                name, description, inviteCode, createdById: user.id
            }
        })
        return newProject;
    } catch (error: any) {
    console.error("ERREUR PRISMA :", error);
    throw error;
}
}

export async function getUserProjects(email: string) {
  try {

    const projets = await prisma.project.findMany({
      where: {
        createdBy: { email }
      },
      include: {
        tasks: {},
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return projets;

  } catch (error: any) {
    console.error("ERREUR PRISMA :", error);
    throw error;
  }
}
