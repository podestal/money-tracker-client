import AuthClient from "./authClient"

export interface User {
    id: number
    email: string
    username: string
}

interface Props {
    username?: string
    email?: string
}

const getUserService = ({ username, email }: Props) => {
    let formattedEmail = ''
    if (email) {
        formattedEmail = email.replace('@', '%40')
    }
    const URL = username ? `users/?username=${username}&email=` : `users/?username=&email=${formattedEmail}`
    return new AuthClient<User>(URL)
}

export default getUserService