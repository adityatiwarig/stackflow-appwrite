import { Permission} from "node-appwrite"  // KON KYA ACCESS KRSKELA

import {db, questionCollection} from "../name"  //ID's
import {databases} from "./config" // SERVER SIDE


export default async function createQuestionCollection(){
  // create collection
  await databases.createCollection(db, questionCollection,  // DB.id,COLLECTIONID , NAME ,PERM.
    questionCollection, [

    Permission.read("any"),  // kOI bhi read kr ske
    Permission.read("users"),   // SIRF USERS HI CRUD PERFORM KRE (LOGGEDIN)
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ])
  console.log("Question collection is created")

  //creating attributes

  await Promise.all([  // all async func sath chlenge.. attribute bnao ek sath
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(db, questionCollection, "content", 10000, true),
    databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
    databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
    databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
  ]);
     console.log("Questions Attributes created!!");
     

  // create Indexes

  /*
  await Promise.all([
    databases.createIndex(
      db,
      questionCollection,
      "title",
      IndexType.Fulltext,
      ["title"],
      ['asc']
    ),
    databases.createIndex(
      db,
      questionCollection,
      "content",
      IndexType.Fulltext,
      ["content"],
      ['asc']
    )
  ])
    */
}