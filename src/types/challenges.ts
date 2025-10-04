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
