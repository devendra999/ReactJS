import { getUser, removeUser, updateUser } from '@/lib/users/data';
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  console.log('single get request............')
  try {
    const id = req.url.split("users/")[1];
    const user = getUser(id);
    if(!user) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
    return NextResponse.json({message: "OK", user}, {status: 200});
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}



export const PUT = async (req: Request) => {
  console.log('single put request............')
  try {
    const {title, desc} = await req.json();
    const id = req.url.split("users/")[1];
    updateUser(id, title, desc);
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "Error", error}, {status: 500});
  }
}



export const DELETE = async (req: Request) => {
  console.log('single delete request............')
  try {
    const id = req.url.split("users/")[1];
    removeUser(id);
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "Error", error}, {status: 500});
  }
}