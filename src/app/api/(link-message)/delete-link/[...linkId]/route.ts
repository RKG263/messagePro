import UserModel from '@/models/User';
import LinkingModel from '@/models/Linking';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';
import { Message } from '@/models/User';
import { NextRequest } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/options';

export async function DELETE(
  request: Request,
  { params }: { params: { linkId: string } }
) {
  const linkId = params.linkId;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;
  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const res=await LinkingModel.findByIdAndDelete(linkId);
    if(!res){
      return Response.json(
        { message: 'link deletion problem', success: false },
        { status: 500 }
      );
    }
    
    return Response.json(
      { message: 'link deleted', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}