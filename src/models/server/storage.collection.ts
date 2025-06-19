import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {   // check kro bucket h ya nhi
    try {
        await storage.getBucket(questionAttachmentBucket);  //agr h to connect ho jao
        console.log("Storage Connected");
    } catch (error) {
        try {
            await storage.createBucket(            // agr nhi h to nya bucket bnao with permission
                questionAttachmentBucket,  //bucketid
                questionAttachmentBucket,  //bucket name
                [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,  //isPUBLIC(only those with permission can access)
                undefined,
                undefined,
                ["jpg", "png", "gif", "jpeg", "webp", "heic"]
            );

            console.log("Storage Created");
            console.log("Storage Connected");
        } catch (error) {
            console.error("Error creating storage:", error);
        }
    }
}