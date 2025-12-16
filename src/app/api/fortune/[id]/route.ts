import { prisma } from "@/lib/db";

/* 
 This type defines what Next.js passes to our route handlers

 The [id] from the URL comes through as params.id
 */

type Params = { params: Promise<{ id: string }> };

/* 
  GET /api/fortune/# 

  Returns one specific fortune by its ID #

  This is a getItemById next function
 */

export async function GET(_request: Request, { params }: Params) {
  /* extracting the id from the url */
  const { id } = await params;

  /* Query db for fortune with this ID */
  const fortune = await prisma.fortune.findUnique({
    /* this parseInt() fnct converts string "5" into the #5 */
    where: { id: parseInt(id) },
  });

  /* if we do not find a fortune we return a 404 err */
  if (!fortune) {
    return Response.json({ error: "No fortune found" }, { status: 404 });
  }
  /* Return the fortune as a .json obj */
  return Response.json(fortune);
}

/* 
PUT /api/fortune/#

updates an existing fortune
*/

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;

  /* get the new data from the request body */
  const body = await request.json();

  try {
    /* update the fortune in the db */
    const fortune = await prisma.fortune.update({
      where: {
        id: parseInt(id),
      },
      data: {
        text: body.text,
        category: body.category,
      },
    });
    return Response.json(fortune);
  } catch {
    /* if fortune doesn't exist then prisma throws nd error */
    return Response.json({ error: "No fortune found" }, { status: 404 });
  }
}

/* 
DELETE() /api/fortune/5

removes fortune with id:[id] from db

*/

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  try {
    await prisma.fortune.delete({
      where: { id: parseInt(id) },
    });
    return Response.json({ message: "Fortune deleted.... 🪦" });
  } catch {
    return Response.json(
      { error: "This fortune cannot be found" },
      { status: 404 }
    );
  }
}
