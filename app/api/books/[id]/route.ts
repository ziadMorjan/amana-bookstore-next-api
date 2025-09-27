import path from "path";
import { NextRequest } from "next/server";
import { readJSON } from "@/utils/readWriteJSON";
import { Book } from "@/types/book";

const booksPath = path.join(process.cwd(), "data", "books.json");

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const books = await readJSON<Book[]>(booksPath);
  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return Response.json({ error: "Book not found" }, { status: 404 });
  }

  return Response.json(book, { status: 200 });
}
