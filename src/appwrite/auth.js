// service class

import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor()
    {        
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        .setDevKey(conf.appwriteDevKey);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name})
    {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount)
                // login the user
                return this.login({email, password});
            else
                return userAccount; // return the empty user
        } catch (error) {
            console.log("Issue in createAccount ", error.message);
            return false;
        }
    }

    async login({email, password})
    {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Issue in login ", error.message);
            return false;
        }
    }

    async getCurrentUser()
    {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Issue in getCurrentUser ", error.message);
            return false;
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Issue in logout ", error.message);
            return false;;
        }
    }
}

const authService = new AuthService();

export default authService;