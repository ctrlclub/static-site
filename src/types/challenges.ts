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


export interface ChallengeFetch {
    success: boolean;
    errorReason: string;
    data: SubchallengeContent[];
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
