import AuthClient from "./authClient"

export interface User {
    id: number
    email: string
    username: string
    first_name: string
    last_name: string
}

interface Props {
    username?: string
    email?: string
    userId?: number
}

const getUserService = ({ username, email, userId }: Props) => {

    let URL = ''
    if (userId) {
        URL = `users/${userId}/`
    } else {
        let formattedEmail = ''
        if (email) {
            formattedEmail = email.replace('@', '%40')
        }
        URL = username ? `users/?username=${username}&email=` : `users/?username=&email=${formattedEmail}`
    }

    return new AuthClient<User>(URL)
}

export default getUserService