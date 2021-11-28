import { DocumentDefinition, FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";

export async function createSession(userId: any, userAgent: string) {
    try {
        const session = await SessionModel.create({user: userId, userAgent})
        return session.toJSON()
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean()
    // lean means its only going to return the object and not the functions associated with it
}