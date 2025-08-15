import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai"
export async function POST(req) {
    const {jobPosition, jobDescription,duration,type} = await req.json();
    
    const FINAL_PROMPT = QUESTIONS_PROMPT
    .replace('{{jobTitle}}',jobPosition)
    .replace('{{jobDescription}}',jobDescription)
    .replace('({{duration}})',duration)
    .replace('{{type}}',type)

    console.log(FINAL_PROMPT)

    try {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'user', content: FINAL_PROMPT }
    ],
  });

  return NextResponse.json({
    content: completion.choices[0].message.content || "[]"
  });
} catch (e) {
  console.error(e);
  return NextResponse.json({
    content: "[]", // return empty list instead of undefined
    error: e.message
  }, { status: 500 });
}
}