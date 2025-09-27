import path from "path";
import { NextRequest } from "next/server";
import { readJSON } from "@/utils/readWriteJSON";
import { Review } from "@/types/review";

const reviewsPath = path.join(process.cwd(), "data", "reviews.json");

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await context.params;

  const reviews = await readJSON<Review[]>(reviewsPath);
  const bookReviews = reviews.filter(r => r.bookId === parseInt(bookId));

  return Response.json(bookReviews, { status: 200 });
}
