import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("HF_TOKEN:", process.env.HF_TOKEN);
  try {
    const { resumeData, mode } = await req.json();

    let prompt = "";

    if (mode === "elon") {
      prompt = `
You are an executive resume optimization AI.
Rewrite this resume into 3 extremely powerful bullet points.
Each bullet must show impact and measurable results.

Resume Data:
${JSON.stringify(resumeData, null, 2)}
`;
    } else {
      prompt = `
You are a professional resume optimization agent.
Rewrite the following resume into a polished, ATS-optimized format.
Use strong action verbs.
Organize into clear sections.

Resume Data:
${JSON.stringify(resumeData, null, 2)}
`;
    }

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3-8B-Instruct",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    
    console.log("HF FULL RESPONSE:", JSON.stringify(result, null, 2));
    
    return NextResponse.json({
      output: result.choices?.[0]?.message?.content ?? "No response generated"
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: "AI processing failed." },
      { status: 500 }
    );
  }
}
