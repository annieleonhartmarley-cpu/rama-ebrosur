import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {

    if (req.method !== "GET") {
      return res.status(405).json({
        message: "Method not allowed"
      });
    }

    const filePath = path.join(process.cwd(), "brochures", "brochure.pdf");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found"
      });
    }

    const stat = fs.statSync(filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="brochure.pdf"'
    );
    res.setHeader("Content-Length", stat.size);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}