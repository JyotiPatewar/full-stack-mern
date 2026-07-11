import User from "../models/User.js";
import Location from "../models/Location.js";
import EmergencyRequest from "../models/EmergencyRequest.js";


export const assignHostelToCaretaker = async(req,res)=>{

try{

const {
 caretakerId,
 locationId
}=req.body;


console.log("BODY:",req.body);


// caretaker check
const caretaker = await User.findById(caretakerId);


if(!caretaker)
{
return res.status(404).json({
success:false,
message:"Caretaker not found"
});
}


if(caretaker.role !== "caretaker")
{
return res.status(400).json({
success:false,
message:"User is not caretaker"
});
}



// CHECK CARETAKER ALREADY ASSIGNED
const alreadyAssigned = await Location.findOne({
 caretaker: caretakerId
});


if(alreadyAssigned)
{
return res.status(400).json({
success:false,
message:`Caretaker already assigned to ${alreadyAssigned.locationName}`
});
}



// location check
const location = await Location.findById(locationId);


if(!location)
{
return res.status(404).json({
success:false,
message:"Hostel not found"
});
}



// check hostel already has caretaker
if(location.caretaker)
{
return res.status(400).json({
success:false,
message:"This hostel already has caretaker"
});
}



// assign

location.caretaker = caretakerId;

await location.save();



// user ke andar bhi save karna hai

caretaker.locations = locationId;

await caretaker.save();



res.status(200).json({

success:true,
message:"Hostel assigned successfully"

});


}
catch(error)
{

console.log("ASSIGN ERROR:",error);

res.status(500).json({
success:false,
message:error.message
});

}

};









export const getCaretakerRequests = async(req,res)=>{

try{

const {caretakerId}=req.params;


const caretaker = await User.findById(caretakerId)
.populate("locations");


if(!caretaker)
{
return res.status(404).json({
success:false,
message:"Caretaker not found"
});
}



const hostelId = caretaker.locations?._id;



if(!hostelId)
{
return res.status(400).json({
success:false,
message:"No hostel assigned to caretaker"
});
}



const filter = {

location: hostelId

};



if(req.query.status)
{
filter.status=req.query.status;
}



if(req.query.overdue==="true")
{
filter.isOverdue=true;
}




const requests = await EmergencyRequest.find(filter)

.populate(
"location",
"locationName zone"
)

.populate(
"assignedDriver",
"name mobile"
)

.sort({
createdAt:-1
});




res.status(200).json({

success:true,

count:requests.length,

data:requests

});


}
catch(error){

console.log("CARETAKER REQUEST ERROR:",error);

res.status(500).json({

success:false,

message:error.message

});


}

};



















export const getAllCaretakers = async(req,res)=>{

try{

const caretakers = await User.find({
 role:"caretaker"
})
.select("name mobile");


res.status(200).json({
 success:true,
 data:caretakers
});


}
catch(error){

res.status(500).json({
 success:false,
 message:error.message
});

}

};












// UPDATE CARETAKER ASSIGNMENT
export const updateCaretakerHostel = async (req, res) => {

  try {

    const { locationId, caretakerId } = req.body;


    if (!locationId || !caretakerId) {
      return res.status(400).json({
        success: false,
        message: "Location and caretaker are required"
      });
    }



    // Check caretaker exists

    const caretaker = await User.findById(caretakerId);


    if (!caretaker) {
      return res.status(404).json({
        success:false,
        message:"Caretaker not found"
      });
    }



    if (caretaker.role !== "caretaker") {
      return res.status(400).json({
        success:false,
        message:"User is not caretaker"
      });
    }




    // Check location exists

    const location = await Location.findById(locationId);


    if (!location) {
      return res.status(404).json({
        success:false,
        message:"Hostel not found"
      });
    }




    // Check hostel already assigned to another caretaker

    if (
      location.caretaker &&
      location.caretaker.toString() !== caretakerId
    ) {

      return res.status(400).json({
        success:false,
        message:"This hostel already has another caretaker"
      });

    }





    // Remove caretaker from previous hostel

    await Location.updateOne(
      {
        caretaker: caretakerId,
        _id:{
          $ne:locationId
        }
      },
      {
        $unset:{
          caretaker:""
        }
      }
    );





    // Assign new hostel to caretaker

    location.caretaker = caretakerId;

    await location.save();





    // Update caretaker user document

    caretaker.locations = locationId;

    await caretaker.save();





    res.status(200).json({

      success:true,
      message:"Caretaker hostel updated successfully",
      data:location

    });


  }
  catch(error){

    console.log("UPDATE CARETAKER ERROR:", error);


    res.status(500).json({

      success:false,
      message:error.message

    });

  }

};