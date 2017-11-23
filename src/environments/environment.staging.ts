// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyAfABMXsnNiSjKeL-ohZ3PpOSn42BifMTs',
        authDomain: 'sniphub-staging.firebaseapp.com',
        databaseURL: 'https://sniphub-staging.firebaseio.com',
        projectId: 'sniphub-staging',
        storageBucket: 'sniphub-staging.appspot.com',
        messagingSenderId: '539914875775'
    },
    elastic: {
        url: 'https://5s886dfw:z7gjc4csm6ylm3zo@pine-2241382.us-east-1.bonsaisearch.net',
        sizePerResults: 20
    },
    angulartics: {
        developerMode: true,
        pageTracking: {
            clearIds: true,
        }
    }
}
