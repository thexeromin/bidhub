const API = process.env.NEXT_PUBLIC_API

export const controllerEndPoint = {
    AUTH: `${API}/auth/local`,
    COMMON: `${API}/common`,
    USERS: `${API}/users`,
}

export const apiEndPoint = {
    LOGIN: `${controllerEndPoint.AUTH}/login`,
    REGISTER: `${controllerEndPoint.AUTH}/signup`,
    SEND_OTP: `${controllerEndPoint.COMMON}/send-otp`,
    VERIFY_OTP: `${controllerEndPoint.COMMON}/verify-otp`,
}
