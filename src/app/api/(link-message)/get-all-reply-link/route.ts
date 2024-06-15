import dbConnect from "@/lib/dbConnect";
import LinkingModel from "@/models/Linking";
import { Reply } from "@/models/Linking";
export async function POST(request:Request) {
  const {linkId}=await request.json();
  dbConnect()
  try {
    const resp=await LinkingModel.findById(linkId);
    if(!resp){
      return Response.json({
        message:"error in finding reply",
        success:false
      },{status:404})
    }
  
  

  return Response.json({
    success:true,
    message:"all reply fetched successfully",
   resp
  },{status:200})


    
  } catch (error) {
    console.error('Error fetching reply:', error);
    return Response.json(
      { message: 'Error in fetching reply', success: false },
      { status: 500 }
    );
  }
}