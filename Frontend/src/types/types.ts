

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

export interface ResponseAuth{
  success: boolean,
  user_id: String
}

export interface Registration{
    loader: boolean
    setLoader: (value: boolean) => void
    registerAccount: (details: RegistrationDetails) => Promise<Response>,
    loginAccount: (details: LoginDetails) => Promise<Response>
    authenticateUser: () => Promise<ResponseAuth>
}

export interface UserDetails{
    firstName: string,
    lastName: string,
    profile: string,
    user_id: string,
}

export interface User{
    users: UserDetails[],
    loading: boolean,
    error: string | null,
    getusers: (user_id: String) => Promise<void>
}

