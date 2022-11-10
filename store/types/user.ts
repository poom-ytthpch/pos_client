export interface SignInState {
    userInfo: object,
    userRole: string
}

const initialState: SignInState = {
    userInfo: { token: "" },
    userRole: ""
}

export default initialState