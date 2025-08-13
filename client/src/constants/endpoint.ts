const API = process.env.NEXT_PUBLIC_API

export const controllerEndPoint = {
    AUTH: `${API}/auth/local`,
    COMMON: `${API}`,
    USERS: `${API}/users`,
}

export const apiEndPoint = {
    LOGIN: `${controllerEndPoint.AUTH}/login`,
    REGISTER: `${controllerEndPoint.AUTH}/signup`,
    CREATE_AUCTION: `${controllerEndPoint.COMMON}/auction`,
    VIEW_ALL_AUCTION: `${controllerEndPoint.COMMON}/auction`,
    VERIFY_OTP: `${controllerEndPoint.COMMON}/verify-otp`,
}
