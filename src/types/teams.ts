export interface MyTeamRequest {
    success: boolean;
    errorReason: string;
    data: MyTeam;
}

export interface MyTeam {
    userIds: string[];
    teamId: number;
    owner: string;
    isOwner: boolean;
}
