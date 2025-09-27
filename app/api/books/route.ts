import path from "path";
import { NextRequest } from "next/server";
import { readJSON, writeJSON } from "@/utils/readWriteJSON";
import { Book } from "@/types/book";

const booksPath = path.join(process.cwd(), "data", "books.json");

export async function GET(req: NextRequest) {
  const books = await readJSON<Book[]>(booksPath);
  return Response.json(books, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const newBook: Book = await req.json();
    const books = await readJSON<Book[]>(booksPath);

    newBook.id = books.length + 1;
    books.push(newBook);

    await writeJSON(booksPath, books);
    return Response.json(newBook, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to add book" }, { status: 500 });
  }
}
