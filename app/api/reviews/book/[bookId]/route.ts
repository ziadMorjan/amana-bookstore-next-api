import path from "path";
import { readJSON } from "@/utils/readWriteJSON";
import { Review } from "@/types/review";

const reviewsPath = path.join(process.cwd(), "data", "reviews.json");

export async function GET(
  req: Request,
  { params }: { params: { bookId: string } }
) {
  const reviews = await readJSON<Review[]>(reviewsPath);
  const filtered = reviews.filter(r => r.bookId === parseInt(params.bookId));
  return Response.json(filtered, { status: 200 });
}
