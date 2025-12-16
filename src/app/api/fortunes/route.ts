import { prisma } from "@/lib/db";

/* 
GET() /api/fortunes

This is a GET(ALL) function 
that returns ALL fortunes from the db
    
*/

export async function GET() {
  /* Fetch all fortunes, newest first  */
  const fortunes = await prisma.fortune.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(fortunes);
}

/* 
POST() /api/fortunes

Creates a new fortune in the db

Request body will be a json({object}) tht looks like
{"text": "Misfortune goes here", "category": "general"}
*/

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.text) {
    return Response.json(
      { error: "To create a fortune cookie you must write a fortune, duh" },
      { status: 400 }
    );
  }

  const fortune = await prisma.fortune.create({
    data: {
      text: body.text,
      ...(body.category && { category: body.category }),
    },
  });
  return Response.json(fortune, { status: 201 });
}
