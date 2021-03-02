import {graphqlClient} from '../graphql'
import Cookies from 'js-cookie'

export const login = async({user,password}) => {
    let query = `
        query ($user: String, $password: String){
            adminLogin(user: $user, password: $password) {
                error
                msg
                token
            }
        }
    `
    let client = graphqlClient()
    let {error, data} = await client.query(query, {user, password}).toPromise()
    if(error) {
        return {error: true, msg: 'Connection Failed'}
    }
    let {adminLogin} = data
    return adminLogin
}

export const verifyAdmin = async () => {
    let token = Cookies.get('sr_token') || ''
    let query = `
        query($token: String) {
            verifyAdminToken(token: $token) {
                error
                msg
                data {
                    user
                    user_name
                }
            }
        }
    `
    let client = graphqlClient()
    let {error, data} = await client.query(query, {token}).toPromise();
    if(error) {
        return {error: true, msg: 'Connection Failed'}
    }
    let {verifyAdminToken} = data
    return verifyAdminToken

}