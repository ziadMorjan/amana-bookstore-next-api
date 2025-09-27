import fs from "fs/promises";

export async function readJSON<T>(filePath: string): Promise<T> {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as T;
}

export async function writeJSON<T>(filePath: string, data: T) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
