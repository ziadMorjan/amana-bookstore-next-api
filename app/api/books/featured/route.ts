import path from "path";
import { readJSON } from "@/utils/readWriteJSON";
import { Book } from "@/types/book";

const booksPath = path.join(process.cwd(), "data", "books.json");

export async function GET() {
  const books = await readJSON<Book[]>(booksPath);
  const featured = books.filter(b => b.featured);
  return Response.json(featured, { status: 200 });
}
