export interface ChallengeListing {
    name: string;
    numSubchallenges: number;
}

export interface ChallengeListingResponse {
    success: boolean;
    challenges: ChallengeListing[];
}
