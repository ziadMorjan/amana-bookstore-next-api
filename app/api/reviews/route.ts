import path from "path";
import { NextRequest } from "next/server";
import { readJSON, writeJSON } from "@/utils/readWriteJSON";
import { Review } from "@/types/review";

const reviewsPath = path.join(process.cwd(), "data", "reviews.json");

export async function GET(req: NextRequest) {
  const reviews = await readJSON<Review[]>(reviewsPath);
  return Response.json(reviews, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const newReview: Review = await req.json();
    const reviews = await readJSON<Review[]>(reviewsPath);

    newReview.id = reviews.length + 1;
    reviews.push(newReview);

    await writeJSON(reviewsPath, reviews);
    return Response.json(newReview, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to add review" }, { status: 500 });
  }
}
