import type { MyTeam } from "./teams";


export interface ChallengeListing {
    challengeId: number,
    name: string;
    unlocked: boolean;
    numSubchallenges: number;
    completedSubchallenges: number;
}

export interface ChallengeListingResponse {
    success: boolean;
    challenges: ChallengeListing[];
    myTeam: MyTeam | undefined;
}



export interface ChallengeContent {
    subchallenges: SubchallengeContent[];
    challengeName: string;
    totalSubchallenges: number;
}

export interface ChallengeFetch {
    success: boolean;
    errorReason: string;
    challengeId: number;
    data: ChallengeContent | undefined;
    teamData: MyTeam | undefined;
}


export interface SubchallengeContent {
    subchallengeId: number;
    content: string;
    completed: boolean;
    answer: string;
}



export interface SubmissionPopup {
    answerCorrect: boolean;
    feedback: string;
    callback: (() => {});
}
