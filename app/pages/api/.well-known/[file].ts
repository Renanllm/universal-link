import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { file } = req.query;

  if (file === "apple-app-site-association") {
    const filePath = path.join(
      process.cwd(),
      "public/.well-known/apple-app-site-association"
    );
    const fileContent = await fs.readFile(filePath, "utf-8");

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(fileContent);
  } else {
    res.status(404).send("Not found");
  }
}
