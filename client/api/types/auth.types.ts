// signup types
export interface SignupPayload {
    arg: {
        body: {
            email: string
            phone: string
            address: string
            password: string
            firstName: string
            lastName: string
        }
    }
}

export interface SignupSuccess {
    accessToken: string
    refreshToken: string
}

export interface SignupError {
    message: string
    error: string
    statusCode: string
}

// signin types
export interface SigninPayload {
    email: any
    password: any
}

export interface SigninSuccess {
    id: string
    name: string
    email: string
    token: {
        accessToken: string
        refreshToken: string
    }
}

export interface SigninError {
    message: string
    error: string
    statusCode: string
}
