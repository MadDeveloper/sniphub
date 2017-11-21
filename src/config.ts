export const config = {
    snippet: {
        minLengthName: 3,
        maxLengthName: 70,
        maxLengthDescription: 1000,
        maxLengthDescriptionShort: 100,
        maxPopularDisplayed: 20,
        maxLatestAddedDisplayed: 20,
        popularCacheDuration: 1000 * (60 * 30), // ms: 30min
        latestAddedCacheDuration: 1000 * 60 // ms: 1min
    },
    notifications: {
        maxPerPage: 20
    },
    comments: {
        maxPerPage: 10
    },
    profile: {
        username: {
            minLength: 2,
            maxLength: 30
        }
    }
}
