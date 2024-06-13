import LinkingModel from "@/models/Linking";
import dbConnect from "@/lib/dbConnect";



export  async function POST(request:Request) {
  dbConnect();
  try {
    const {username,message}=await request.json();
    if(!username || !message){
      return Response.json({
        success:false,
        message:"please eneter message",
      },{status:500})
    }
   const resp= await LinkingModel.create({username,message});
   return Response.json({
    success:true,
    message:"message post successfully"
   })
  } catch (error) {
    console.error('Error in linking  message:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

