import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { JWTCredentials } from '../../services/auth/authClient'
import loginService, {JWT} from '../../services/auth/loginService'

const useLogin = (): UseMutationResult<JWT, Error, JWTCredentials> => {
    
    return useMutation({
        mutationFn: (data: JWTCredentials) => loginService.post(data),
        onSuccess: (jwtData: JWT) => {
            console.log('jwtData', jwtData)
            
        },
        onError: (err) => {
            console.log(err)
        },
    })
}

export default useLogin