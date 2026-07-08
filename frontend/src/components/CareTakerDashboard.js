import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Api from "../api/Api";
import { toast } from "react-toastify";


export default function CareTakerDashboard(){

const [requests,setRequests]=useState([]);
const [statusFilter,setStatusFilter]=useState("All");
const [loading,setLoading]=useState(false);


const caretakerId = localStorage.getItem("id");


// ================= GET REQUESTS =================

const getRequests = useCallback(async()=>{

try{

setLoading(true);

const res = await axios.get(
 `${Api.get_Caretaker_Reqs}/${caretakerId}`
);


setRequests(
 res.data?.data || []
);


}
catch(err){

console.log(err);

toast.error(
 err.response?.data?.message ||
 "Failed to load requests"
);

}
finally{
setLoading(false);
}

},[caretakerId]);



useEffect(()=>{

getRequests();

},[getRequests]);



// ================= FILTER =================


const filteredRequests = requests.filter((req)=>{

if(statusFilter==="All")
return req.status !== "Completed";


return req.status===statusFilter;

});



const overdueRequests = filteredRequests.filter(
(req)=>
req.isOverdue &&
req.status!=="Completed"
);


const activeRequests = filteredRequests.filter(
(req)=>
!req.isOverdue ||
req.status==="Completed"
);





return (

<div className="min-h-screen bg-[#4CBB17]/20">


{/* HEADER */}

<div className="bg-[#4CBB17]/40 px-4 py-4 lg:px-8 mb-6">

<h1 className="
flex 
items-center 
gap-3
text-3xl 
lg:text-5xl
font-extrabold
text-green-900
">

<img
src="garbageVehicle.jpeg"
className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
/>

CleanTrack

</h1>


<p className="text-gray-800 mt-2">
Smart Waste Management Control Center
</p>


</div>




{/* TITLE */}

<div className="
bg-green-700 
text-white 
py-4
shadow
">

<h1 className="
text-center
text-xl
sm:text-2xl
lg:text-3xl
font-bold
">

Caretaker Dashboard

</h1>

</div>





<div className="
p-4
lg:p-8
">


<div className="
bg-white
rounded-2xl
shadow
p-5
">



{/* TOP */}

<div className="
flex
flex-col
md:flex-row
justify-between
gap-4
mb-6
">


<div>

<h2 className="
text-3xl
font-bold
text-green-900
">

Pickup Requests

</h2>


<p className="text-gray-500">
Assigned Hostel Cleaning Requests
</p>

</div>




<select

value={statusFilter}

onChange={(e)=>
setStatusFilter(e.target.value)
}

className="
border
rounded-xl
px-4
py-2
w-full
md:w-60
"

>

<option value="All">
All Active
</option>


<option value="Pending">
Pending
</option>


<option value="Scheduled">
Scheduled
</option>


<option value="Arrived">
Arrived
</option>


<option value="Completed">
Completed
</option>


</select>


</div>





{
loading ?

<div className="
text-center
py-10
text-blue-600
font-semibold
">

Loading Requests...

</div>


:


filteredRequests.length===0 ?

<div className="
text-center
py-16
">

<div className="text-6xl">
🧹
</div>

<h2 className="
text-2xl
font-bold
text-gray-500
mt-3
">

No Requests Found

</h2>

</div>



:

<div className="space-y-8">





{/* OVERDUE */}


{
overdueRequests.length>0 &&

<div>


<h2 className="
text-2xl
font-bold
text-red-600
mb-4
">

Overdue Requests ({overdueRequests.length})

</h2>




<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
">


{
overdueRequests.map((req)=>(


<RequestCard
key={req._id}
req={req}
overdue={true}
/>


))
}


</div>


</div>

}







{/* ACTIVE */}



<div>


<h2 className="
text-2xl
font-bold
text-green-700
mb-4
">

Requests

</h2>



<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
">


{
activeRequests.map((req)=>(


<RequestCard
key={req._id}
req={req}
/>


))
}


</div>


</div>






</div>

}



</div>


</div>


</div>

);

}





// ================= CARD COMPONENT =================


function RequestCard({req,overdue}){


return (

<div

className={`
rounded-2xl
p-5
border
hover:shadow-lg
transition

${
overdue
?
"border-red-500 bg-red-50"
:
"bg-white"
}

`}

>


<h3 className="
text-xl
font-semibold
text-green-800
">

📍 {req.location?.locationName}

</h3>



<div className="
flex
justify-between
items-center
mt-4
">


<span>
Priority:
<b>
 {" "}
 {req.priority}
</b>
</span>



<span

className={

req.status==="Completed"
?
"bg-green-500 text-white px-4 py-1 rounded-full"

:

req.status==="Scheduled"
?
"bg-sky-500 text-white px-4 py-1 rounded-full"


:

req.status==="Arrived"
?
"bg-orange-500 text-white px-4 py-1 rounded-full"


:

"bg-yellow-500 text-black px-4 py-1 rounded-full"

}

>


{req.status}


</span>


</div>




<p className="
text-sm
text-gray-500
mt-4
">

Created:

{" "}

{
new Date(req.createdAt)
.toLocaleString("en-IN",{

day:"2-digit",
month:"short",
year:"numeric",
hour:"2-digit",
minute:"2-digit",
hour12:true

})
}


</p>





{
req.scheduledDate &&

<p className="
text-sm
text-sky-700
mt-2
font-medium
">

Scheduled:

{" "}

{
new Date(req.scheduledDate)
.toLocaleDateString("en-IN")
}

{" | "}

{req.scheduledTime}

</p>

}






{
req.assignedDriver &&

<p className="
text-sm
text-gray-700
mt-2
">

Driver:

{" "}

<b>
{req.assignedDriver.name}
</b>

</p>

}



{
overdue &&

<span className="
inline-block
mt-3
bg-red-600
text-white
px-3
py-1
rounded-full
text-xs
font-bold
">

OVERDUE

</span>

}



</div>


)

}