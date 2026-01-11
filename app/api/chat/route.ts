// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { KNOWLEDGE } from "./knowledge";

export const runtime = "nodejs";

/* ================= COST CONTROLS ================= */

// Hard caps to prevent expensive usage
const MAX_INPUT_CHARS = 1200;        // ~250–300 tokens
const MAX_HISTORY_MESSAGES = 6;      // last N turns
const MAX_OUTPUT_TOKENS = 280;       // hard output cap

/* ================================================= */

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ReqBody = {
  messages: ChatMessage[];
};

/* ================= SYSTEM PROMPT ================= */

const SYSTEM_PROMPT = `
You are CODEEEE AI Consultant.

ROLE
- Advise small businesses on websites, software, and automation.
- Help choose the right solution, not oversell.

TONE
- Calm
- Technical
- Confident
- Concise
- Terminal-style when useful

STRICT RULES
- Use ONLY the company knowledge provided.
- Never invent clients, projects, metrics, or case studies.
- Never promise prices or timelines without explaining dependencies.
- If unsure, say it requires consultation.
- Do NOT act like a human employee.
- Do NOT use sales hype.

PRICING RULES
- Give ranges only.
- Always explain what affects cost.
- Ask clarifying questions before suggesting scope.

RESPONSE STYLE
- Prefer bullet points (▸)
- Never exceed ~180 words
- Ask at most 2 follow-up questions
- End with a next-step suggestion (consultation or WhatsApp)

COMPANY KNOWLEDGE:
${KNOWLEDGE}
`.trim();

/* ================= OPENAI CLIENT ================= */

function getClient() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

async function callOpenAI(messages: ChatMessage[]) {
  const client = getClient();
  if (!client) {
    return "AI is temporarily unavailable. Please use WhatsApp or the contact form.";
  }

  const model = process.env.OPENAI_MODEL || "gpt-5";

  const res = await client.chat.completions.create({
    model,
    messages,
    temperature: 0.4,
    max_tokens: MAX_OUTPUT_TOKENS, // 🔒 HARD LIMIT
  });

  return res.choices?.[0]?.message?.content?.trim() || "";
}

/* ================= API ROUTE ================= */

export async function POST(req: Request) {
  try {
    // 🔒 Safety guard for deployments without API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        ok: true,
        text: "AI is temporarily unavailable. Please contact us via WhatsApp or the consultation form.",
      });
    }

    const body = (await req.json()) as ReqBody;

    if (!Array.isArray(body.messages)) {
      return NextResponse.json(
        { ok: false, error: "Invalid messages payload" },
        { status: 400 }
      );
    }

    /* -------- INPUT SIZE GUARD -------- */
    const userText = body.messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join("\n");

    if (userText.length > MAX_INPUT_CHARS) {
      return NextResponse.json(
        {
          ok: false,
          error: "Message too long. Please summarize your requirements.",
        },
        { status: 400 }
      );
    }

    /* -------- HISTORY TRIM -------- */
    const trimmedHistory = body.messages.slice(-MAX_HISTORY_MESSAGES);

    /* -------- FINAL MESSAGE STACK -------- */
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...trimmedHistory,
    ];

    /* -------- AI CALL -------- */
    const reply = await callOpenAI(messages);

    return NextResponse.json({
      ok: true,
      text: reply,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "Chat service unavailable",
      },
      { status: 500 }
    );
  }
}