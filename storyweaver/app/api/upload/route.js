import { NextResponse } from "next/server";
import { storage } from "@/libs/firebaseClient";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

    // unique path in storage
    const fileName = `stories/${uuidv4()}.webm`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, buffer, {
      contentType: "audio/webm",
    });

    const audioUrl = await getDownloadURL(storageRef);

    return NextResponse.json({ audioUrl });

  } catch (error) {
    console.error("Audio upload error:", error);
    return NextResponse.json(
      { error: "Audio upload failed" },
      { status: 500 }
    );
  }
}
