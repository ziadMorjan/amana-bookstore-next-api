import path from "path";
import { NextRequest } from "next/server";
import { readJSON } from "@/utils/readWriteJSON";
import { Book } from "@/types/book";

const booksPath = path.join(process.cwd(), "data", "books.json");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return Response.json({ error: "Missing start or end date" }, { status: 400 });
  }

  const books = await readJSON<Book[]>(booksPath);
  const filtered = books.filter(b => {
    const published = new Date(b.publishedDate);
    return published >= new Date(start) && published <= new Date(end);
  });

  return Response.json(filtered, { status: 200 });
}
