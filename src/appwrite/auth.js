import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl);
        this.client.setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call here login method
                this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async logout() {
        // eslint-disable-next-line no-useless-catch
        try {
            await this.account.deleteSession()
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.get()
        } catch (error) {
            // throw error;
            console.log(error);
        }

        // we are getting error here, bcz this line is unreachable, above we are using throw error with that  
        return null;
    }
}


const authService = new AuthService();

export default authService;
