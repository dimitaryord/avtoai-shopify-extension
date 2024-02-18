let userSession = {}

export const getUserSession = (userIp) => userSession[userIp]

export const setUserSession = (userIp, session) => {
    userSession[userIp] = { ...session, created_at: new Date().toISOString() }
}