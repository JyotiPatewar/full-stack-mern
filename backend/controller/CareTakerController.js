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



const location = await Location.findById(locationId);


if(!location)
{
return res.status(404).json({
success:false,
message:"Hostel not found"
});
}



// assign caretaker to location

location.caretaker = caretakerId;


await location.save();



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

const caretaker =
await User.findById(caretakerId)
.populate("locations");



if(!caretaker)
{
return res.status(404).json({
message:"Caretaker not found"
});
}



const hostelIds =
caretaker.locations.map(
(item)=>item._id
);



const filter={
location:{
$in:hostelIds
}
};



if(req.query.status)
{
filter.status=req.query.status;
}



if(req.query.overdue==="true")
{
filter.isOverdue=true;
}



const requests =
await EmergencyRequest.find(filter)

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
catch(error)
{

res.status(500).json({
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