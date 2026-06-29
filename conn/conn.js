// import mongoose from "mongoose";

// export const conn = async () =>{
//     try{
//         await mongoose.connect(`${process.env.URI}`);
//         console.log("Connected to Database");
//     }catch(err){
//         console.log(err);
//     }
// }







import mongoose from "mongoose";

export const conn = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.URI);

    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
};


