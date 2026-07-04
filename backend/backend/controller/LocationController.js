import Location from "../models/Location.js";
import User from "../models/User.js";
// export const createLocation = async (req, res) => {
//   try {
//     console.log("REQ BODY =>", req.body);

//     const location = await Location.create(req.body);

//     res.status(201).json(location);

//   } catch (error) {

//     console.log("CREATE LOCATION ERROR =>", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const createLocation = async (req, res) => {
  try {
    const { locationName, zone, latitude, longitude } = req.body;

    // Check if location already exists
    const existingLocation = await Location.findOne({
      locationName: locationName.trim(),
    });

    if (existingLocation) {
      return res.status(400).json({
        success: false,
        message: `Location "${locationName}" is already assigned to ${existingLocation.zone}`,
      });
    }

    const location = await Location.create({
      locationName,
      zone,
      latitude,
      longitude,
    });

    res.status(201).json({
      success: true,
      message: "Location created successfully",
      location,
    });
  } catch (error) {
    console.log("CREATE LOCATION ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};






export const getLocationsByZone = async (req, res) => {
  try {
    const { zone } = req.params;

    console.log("Zone:", zone);

    const supervisor = await User.findOne({
      role: "supervisor",
      zone,
    });

    console.log("Supervisor:", supervisor);

    const locations = await Location.find({ zone });

    console.log("Locations:", locations);

    res.status(200).json({
      success: true,
      supervisor: supervisor?.name,
      zone,
      locations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





export const updateLocation = async (req,res)=>{
try{

const {id}=req.params;

const {locationName,zone,latitude,longitude}=req.body;

const duplicate=await Location.findOne({
locationName,
_id:{$ne:id}
});

if(duplicate){
return res.status(400).json({
success:false,
message:"Location already exists"
});
}

const location=await Location.findByIdAndUpdate(
id,
{
locationName,
zone,
latitude,
longitude
},
{new:true}
);

res.json({
success:true,
message:"Location Updated Successfully",
location
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}
}




export const deleteLocation=async(req,res)=>{

try{

await Location.findByIdAndDelete(req.params.id);

res.json({
success:true,
message:"Location Deleted"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

}




export const getSingleLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found"
      });
    }

    res.json({
      success: true,
      location
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};