import path from "path";
import { NextRequest } from "next/server";
import { readJSON } from "@/utils/readWriteJSON";
import { Book } from "@/types/book";

const booksPath = path.join(process.cwd(), "data", "books.json");

export async function GET(req: NextRequest) {
  const books = await readJSON<Book[]>(booksPath);
  const sorted = [...books].sort((a, b) => b.rating - a.rating);
  return Response.json(sorted.slice(0, 5), { status: 200 });
}
