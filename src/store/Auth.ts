import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import {AppwriteException, ID, Models} from "appwrite"
import { account } from "@/models/client/config";


export interface UserPrefs {  
  reputation: number            //UPVOTES SE DECIDE HOGA
}

interface IAuthStore {           // STORE BANN RHA HAI

  session: Models.Session | null;          // ACTIVE USER KA SESSION
  jwt: string | null
  user: Models.User<UserPrefs> | null      // USER DETAILS
  hydrated: boolean                  // LOCALSTORAGE SE DATA LOAD HO RHA HAI ??

  setHydrated(): void;               // HYDRATED KO TRUE WHEN REHYDRATION COMP    
  verfiySession(): Promise<void>;       // CHECK CURR SESSION ACTIVE
  
  login(
    email: string,
    password: string
  ): Promise<
  {
    success: boolean;
    error?: AppwriteException| null
  }>
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<
  {
    success: boolean;
    error?: AppwriteException| null
  }>
  logout(): Promise<void>
}


export const useAuthStore = create<IAuthStore>()(   //ZUSTAND STORE (IMMER , PERSIST)
  persist(         // KEEP SB KUCH IN LOCALSTORAGE

    immer((set) => ({          // IMMER TAKE CARE STATE ARE MUTATED OR NOT
      session: null,   // SURU ME KUCH NAI HAI
      jwt: null,
      user: null,      // KOI USER DATA NAI H SURU ME
      hydrated: false,

      setHydrated() {
        set({hydrated: true})
      },

      async verfiySession() {
        try {
          const session = await account.getSession("current")  // GIVES A CURRENT USER
          set({session})

        } catch (error) {
          console.log(error)
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(email, password)
          const [user, {jwt}] = await Promise.all([
            account.get<UserPrefs>(),   // USER BANAO
            account.createJWT()          // JWT BANAO

          ])
          if (!user.prefs?.reputation) await account.updatePrefs<UserPrefs>({
            reputation: 0        // USER KE PREF ME REP NAI HAI TO 0 KRO
          })

          set({session, user, jwt})  // IIN TENO KO SET KRO
          
          return { success: true}

        } catch (error) {

          console.log(error)
          return {
            success: false,
            error: error instanceof AppwriteException ? error: null,
            
          }
        }
      },

      async createAccount(name:string, email: string, password: string) {
        try {
          await account.create(ID.unique(), email, password, name)
          return {success: true}
        } catch (error) {
          console.log(error)
          return {
            success: false,
            error: error instanceof AppwriteException ? error: null,
            
          }
        }
      },

      async logout() {
        try {
          await account.deleteSessions()   // ISME SIDHE DELETE SESSION KRTE HAI 
          set({session: null, jwt: null, user: null})  // SB KUCH KO NULL KRO
          
        } catch (error) {
          console.log(error)
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage(){  // calls setHydrated() taki sare comp ko pta chle ki store loaded
        return (state, error) => {
          if (!error) state?.setHydrated()
        }
      }
    }
  )
)