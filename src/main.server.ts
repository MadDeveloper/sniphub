if (!navigator) {
    (<any>navigator) = {
        userAgent: 'server',
        platform: 'server',
        authentication: null,
        cookieEnabled: false
    }
}

export { AppServerModule } from './app/app.server.module'
