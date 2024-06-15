import dbConnect from "@/lib/dbConnect";
import LinkingModel from "@/models/Linking";
import { Reply } from "@/models/Linking";
export async function POST(request:Request) {
  const {linkId,content,username}=await request.json();
  dbConnect()
  try {
    const resp=await LinkingModel.findById(linkId);
    if(!resp){
      return Response.json({
        message:"error in finding reply",
        success:false
      },{status:404})
    }

    const replyResult={
      content:content,
      username:username,
     
    }
  resp.reply.push(replyResult as Reply);
  await resp.save();

  return Response.json({
    success:true,
    message:"replied successfully",
    resp
  },{status:201})


    
  } catch (error) {
    console.error('Error sending reply:', error);
    return Response.json(
      { message: 'Error in sending reply', success: false },
      { status: 500 }
    );
  }
}