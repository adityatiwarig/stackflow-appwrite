import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        // check kro bucket h ya nhi
        await storage.getBucket(questionAttachmentBucket);  // agr h to connect ho jao
        console.log("Storage Connected");
    } catch (error) {
        console.warn("Bucket not found. Creating new bucket...");
        try {
            await storage.createBucket(
                questionAttachmentBucket,  // bucketId
                questionAttachmentBucket,  // bucket name
                [
                    Permission.create("users"),          // koi bhi logged-in user create kr skta h
                    Permission.read("users"),            // sirf logged-in users hi dekh skte h
                    Permission.update("users"),          // update krne ki permission
                    Permission.delete("users"),          // delete krne ki permission
                ],
                false,                                   // isPUBLIC (false means only those with permission can access)
                undefined,                               // fileSizeLimit
                undefined,                               // fileRetention
                ["jpg", "png", "gif", "jpeg", "webp", "heic"]  // allowed file types
            );

            console.log("Storage Created");
            console.log("Storage Connected");
        } catch (createError) {
            console.error("Error creating storage:", createError);  // agr bucket creation m dikkat aaye
        }
    }
}
