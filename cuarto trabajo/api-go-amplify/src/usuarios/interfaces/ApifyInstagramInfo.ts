export interface Request {
    requestId: string;
    url: string;
    loadedUrl: string;
    method: string;
    retryCount: number;
    errorMessages: any[];
}

export interface Debug {
    request: Request;
    pageType: string;
    resultsType: string;
}

export interface ApifyInstagramInfo {
    "#debug": Debug;
    id: string;
    username: string;
    fullName: string;
    biography: string;
    externalUrl: string;
    externalUrlShimmed: string;
    followersCount: number;
    followsCount: number;
    hasChannel: boolean;
    highlightReelCount: number;
    isBusinessAccount: boolean;
    joinedRecently: boolean;
    businessCategoryName?: any;
    private: boolean;
    verified: boolean;
    profilePicUrl: string;
    profilePicUrlHD: string;
    facebookPage?: any;
    igtvVideoCount: number;
    relatedProfiles: any[];
    latestIgtvVideos: any[];
    postsCount: number;
    latestPosts: any[];
    following: any[];
    followedBy: any[];
    taggedPosts: any[];
    "#error"?: string;
    "#url"?: string;
}
