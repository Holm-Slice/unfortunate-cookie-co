export async function GET(request: Request) {
  return Response.json({ message: `Hello` });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(body, { status: 201 });
}
