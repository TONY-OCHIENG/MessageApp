

export interface RegistrationDetails{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface LoginDetails{
    email: string,
    password: string
}

export interface Response{
    success: boolean,
    message: string
}

export interface Registration{
    loader: boolean
    setLoader: (value: boolean) => void
    registerAccount: (details: RegistrationDetails) => Promise<Response>,
    loginAccount: (details: LoginDetails) => Promise<Response>
}