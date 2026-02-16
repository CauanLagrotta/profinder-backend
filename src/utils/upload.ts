
import streamifier from "streamifier";
import { cloudinary } from "../lib/claudinary";

export function uploadImage(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "posts" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}
