// import mongoose from "mongoose";

// export const conn = async () =>{
//     try{
//         await mongoose.connect(`${process.env.URI}`);
//         console.log("Connected to Database");
//     }catch(err){
//         console.log(err);
//     }
// }







// import mongoose from "mongoose";

// export const conn = async () => {
//   try {
//     if (mongoose.connection.readyState >= 1) {
//       return;
//     }

//     await mongoose.connect(process.env.URI);

//     console.log("Connected to Database");
//   } catch (err) {
//     console.log(err);
//   }
// };





import mongoose from "mongoose";

const MONGO_URI = process.env.URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const conn = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};


