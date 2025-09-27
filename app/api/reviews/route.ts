import path from "path";
import { readJSON, writeJSON } from "@/utils/readWriteJSON";
import { Review } from "@/types/review";

const reviewsPath = path.join(process.cwd(), "data", "reviews.json");

export async function GET() {
  const reviews = await readJSON<Review[]>(reviewsPath);
  return Response.json(reviews, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const newReview: Review = await req.json();
    const reviews = await readJSON<Review[]>(reviewsPath);

    newReview.id = reviews.length + 1;
    reviews.push(newReview);

    await writeJSON(reviewsPath, reviews);
    return Response.json(newReview, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to add review" }, { status: 500 });
  }
}
