import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class StorageService 
{
    client = new Client();
    databases;
    bucket;

    constructor()
    {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        .setDevKey(conf.appwriteDevKey);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, user_id })
    {
        console.log("File id, ", featuredImage);
        try {   
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    user_id
                }
            )
        } catch (error) {
            console.log("Issue in createPost ", error.message);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status })
    {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Issue in updatePost");
            throw error;
        }
    }

    async deletePost(slug)
    {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Issue in deletePost, ", error.message);
            return false;
        }
    }

    async getPost(slug)
    {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Issue in getPost");
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')])
    {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Issue in getPosts ", error.message);
            return false;
        }
    }


    // File upload services
    async uploadFile(file)
    {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("Issue in uploadFile ", error.message);
            return false;
        }
    }

    async deleteFile(file_id)
    {
        try {
            return await this.storage.deleteFile(conf.appwriteBucketId, file_id);
        } catch (error) {
            console.log("Issue in deleteFile ", error.message);
            return false;
        }
    }

    getFilePreview(file_id)
    {
        return this.bucket.getFileView(conf.appwriteBucketId, file_id);
    }
}

const storageService = new StorageService();
export default storageService;