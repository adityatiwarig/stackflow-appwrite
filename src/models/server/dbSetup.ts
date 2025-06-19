import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";  // server

export default async function getOrCreateDB() {
  console.log("📦 getOrCreateDB() called");
  try {
    // db h ya nhi
    await databases.get(db);     // agr h to connect ho jao
    
    console.log("Database connected");
  } catch (error) {
    console.warn("Database not found. Creating database...");
    try {
      await databases.create(db, db);    // agr db nhi h to nya db bnao
      console.log("Database created");

      // create collections
      await Promise.all([
        createQuestionCollection(),   // questions wali collection
        createAnswerCollection(),     // answers wali collection
        createCommentCollection(),    // comments wali collection
        createVoteCollection(),       // votes wali collection
      ]);
      
      console.log("Collections created");
      console.log("Database connected");
    } catch (createError) {
      console.error("Error creating database or collections:", createError);  // agr koi error aaye db ya collections bnate waqt
    }
  }

  return databases;  // db return kro
}
