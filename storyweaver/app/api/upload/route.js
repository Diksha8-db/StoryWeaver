import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/libs/cloudinary";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("audio");

    if (!file) {
      return NextResponse.json(
        { error: "Audio file missing" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Audio = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await uploadToCloudinary(base64Audio, "audio-only");

    return NextResponse.json({
      audioUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

  } catch (error) {
    console.error("Audio upload error:", error);
    return NextResponse.json(
      { error: "Audio upload failed" },
      { status: 500 }
    );
  }
}
