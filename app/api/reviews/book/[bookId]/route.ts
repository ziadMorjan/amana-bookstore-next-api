import path from "path";
import { NextRequest } from "next/server";
import { readJSON } from "@/utils/readWriteJSON";
import { Review } from "@/types/review";

const reviewsPath = path.join(process.cwd(), "data", "reviews.json");

export async function GET(req: NextRequest, context: { params: { bookId: string } }) {
  const { bookId } = context.params;
  const reviews = await readJSON<Review[]>(reviewsPath);
  const filtered = reviews.filter(r => r.bookId === parseInt(bookId));

  return Response.json(filtered, { status: 200 });
}
