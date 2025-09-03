export interface LoginAttempt {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    errorReason: string;
}
