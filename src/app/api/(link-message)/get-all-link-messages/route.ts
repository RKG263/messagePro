import { NextResponse } from 'next/server';
import LinkingModel from "@/models/Linking";
import dbConnect from "@/lib/dbConnect";

interface Linking {
  createdAt: Date;
  [key: string]: any; 
}

export async function GET(request: Request) {
  await dbConnect();
  try {
    const resp: Linking[] = await LinkingModel.find({});

    if (!resp || resp.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No messages found",
      }, { status: 404 });
    }

    const sortedResp = resp.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      message: "All messages retrieved successfully",
      resp: sortedResp,
    }, { status: 200 });

  } catch (error) {
    console.error('Error in getting linking messages:', error);
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
