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
    elastic: {
        url: 'https://5s886dfw:z7gjc4csm6ylm3zo@pine-2241382.us-east-1.bonsaisearch.net',
        sizePerResults: 20
    },
    notifications: {
        maxPerPage: 20
    },
    comments: {
        maxPerPage: 10
    }
}
