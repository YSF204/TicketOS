declare global {
    namespace Express {
        interface Request {
            user?: Record<string, unknown>;
        }
    }
}

export interface User {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface LoginInput {
    email: string,
    password: string
}