export interface LoadDashboard {
    success: boolean;
    errorReason: string;

    content: DashboardContent | undefined;
}

export interface DashboardContent {
    challenges: ChallengeEntry[];
}

export interface ChallengeEntry {
    challengeId: number;
    visible: boolean;
    unlocked: boolean;
}
