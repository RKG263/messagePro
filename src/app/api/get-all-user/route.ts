import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function  GET(reques:Request){
  dbConnect();
  try {
    const user=await UserModel.find({});
    if(!user){
     return Response.json({
        success:false,
        message:"no user exist"
      },{status:404})
      
    }
    const result=[{}];
    user.map((item,key)=>{
       if(item.isVerified ){
        result.push({username:item.username});
       }
    })
   
   return Response.json({
      success:true,
      message:"all user fetch succssfully",
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