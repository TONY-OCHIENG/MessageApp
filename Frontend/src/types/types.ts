

export interface RegistrationDetails{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface Response{
    success: boolean,
    message: string
}

export interface Registration{
    loader: boolean,
    setLoader: () => Promise<void>,
    registerAccount: (details: RegistrationDetails) => Promise<Response>
}