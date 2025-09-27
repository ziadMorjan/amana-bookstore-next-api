import path from "path";
import { readJSON, writeJSON } from "@/utils/readWriteJSON";
import { Book } from "@/types/book";

const booksPath = path.join(process.cwd(), "data", "books.json");

export async function GET() {
  const books = await readJSON<Book[]>(booksPath);
  return Response.json(books, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const newBook: Book = await req.json();
    const books = await readJSON<Book[]>(booksPath);

    newBook.id = books.length + 1;
    books.push(newBook);

    await writeJSON(booksPath, books);
    return Response.json(newBook, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to add book" }, { status: 500 });
  }
}
