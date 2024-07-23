import { comment } from '@/app/lib/firebase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const req = await request.json()
  let res: { status?: boolean; message?: string; statusCode?: number } = { status: false, message: '', statusCode: 500 }
  const callbacks = (result: { status: boolean; message: string; statusCode: number }) => {
    res = result
  }
  await comment(req, callbacks)
  if (res.status) {
    return NextResponse.json({ status: res.status, message: res.message }, { status: res.statusCode })
  } else {
    return NextResponse.json({ status: false, message: 'An error occurred' }, { status: 500 })
  }
}
