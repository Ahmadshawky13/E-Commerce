import NextAuth , {DefaultSession} from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {

    interface User{
        user:{
            token: string,
            name:string,
            email:string,
            role:string
        }
        token:string
    }
    interface Session{
        user:User['user']
    }
  
  
}


declare module "next-auth/jwt" {
  interface JWT {
    user:User['user']
    idToken?: string
  }
}