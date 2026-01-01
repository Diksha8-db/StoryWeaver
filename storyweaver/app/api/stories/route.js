import { NextResponse } from "next/server";
import { db } from "@/libs/firebaseClient";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";

// saving stories 
export async function POST(req) {
  try {
    const {
      transcript,
      analysis,
      audioUrl,
      languageCode,
      languageName,
      region,
      speakerName,
    } = await req.json();

    if (!transcript || !analysis || !audioUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Transcript" , transcript)

    const docRef = await addDoc(collection(db, "stories"), {
      transcript,
      title: analysis.title,
      translatedText: analysis.translatedText,
      culturalNotes: analysis.culturalNotes,
      summary: analysis.summary,
      audioUrl,
      languageCode,
      languageName,
      region,
      speakerName,
      createdAt: serverTimestamp(),
    });

    console.log("Document referemce : ",docRef)

    return NextResponse.json({
      success: true,
      id: docRef.id,
    });

  } catch (error) {
    console.error("Firestore save error:", error);
    return NextResponse.json(
      { error: "Failed to save story" },
      { status: 500 }
    );
  }
}

// ferching stories based on region parameter or fetching all stories if nothing is given

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region");

    const searchParam = searchParams.get("search")

    let q;

    if (region) {
      q = query(
        collection(db, "stories"),
        where("region", "==", region),
        orderBy("createdAt", "desc")
      );
    } 
    else if(searchParam){
      q = query(
        collection(db,"stories"),
        where("language","==",searchParam),
        orderBy("createdAt","desc")
      )
    }
    else {
      q = query(
        collection(db, "stories"),
        orderBy("createdAt", "desc")
      );
    }

    const snapshot = await getDocs(q);

    const stories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // console.log(stories)

    return NextResponse.json({
      success: true,
      count: stories.length,
      stories,
    });

  } catch (error) {
    console.error("Fetch stories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
