import path from "path";
import { readJSON } from "@/utils/readWriteJSON";
import { Book } from "@/types/book";

const booksPath = path.join(process.cwd(), "data", "books.json");

export async function GET() {
  const books = await readJSON<Book[]>(booksPath);
  const sorted = [...books].sort((a, b) => b.rating - a.rating).slice(0, 5);
  return Response.json(sorted, { status: 200 });
}
