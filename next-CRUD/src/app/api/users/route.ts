import { addUser, getUsers } from '@/lib/users/data'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: Request, res: Response) => {
  console.log('get request............')
  try {
    const users = getUsers();
    return NextResponse.json({message: "OK", users }, { status : 200 });
  } catch (error) {
      return NextResponse.json({message: "Error", error}, { status: 500 })
  }
}



export const POST = async (req: Request, res: Response) => {
  console.log('post request............')
  const { title, desc } = await req.json();
  try {
    const user = { title, desc, date: new Date(), id: Date.now().toString() };
    addUser(user);
    return NextResponse.json({message: "OK", user }, { status : 201 });
  } catch (error) {
      return NextResponse.json({message: "Error", error}, { status: 500 })
  }
}


