import dbConnect from "@/lib/dbConnect";
import UserModel from '@/models/User';

export async function POST(request:Request) {
   dbConnect();
   try {

     const {username}=await request.json();
     console.log(username)
    const user=await UserModel.findOne({username:username});
    if(!user){
      return Response.json({
        success:false,
        message:"no user exist by this username"
      },{status:404})
    }
    const result={
      isAcceptingMessages:user.isAcceptingMessages
    }
     return Response.json({
      success:true,
      message:"successfullt get the user",
      result
     },{status:200})
   } catch (error) {
    console.error('Error fetching  user:', error);
    return Response.json(
      { success: false, message: 'Error fetching user' },
      { status: 500 }
    );
   }
}