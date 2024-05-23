import { NextResponse, NextRequest } from "next/server";
const data = [
  {
    id: 1,
    name: "sepatu",
    price: 1000000,
  },
  {
    id: 2,
    name: "sepatu baru",
    price: 10000000,
  },
  {
    id: 3,
    name: "sepatu bekas",
    price: 100000,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const detailProduct = data.find((item) => item.id === Number(id));
    if (!detailProduct) {
      return NextResponse.json({
        status: 404,
        Message: "Not Found",
        data:{}
      });
    }
    return NextResponse.json({
      status: 200,
      Message: "success",
      data: detailProduct,
    });
  }

}
