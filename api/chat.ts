import { GoogleGenAI } from '@google/genai';
import type { ApiRequest, ApiResponse } from './_lib/token';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const messages = body?.messages as ChatMessage[] | undefined;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'A valid messages array is required.' });
    }

    const systemInstruction = `You are the official Behavioral Science & Academy Advisor for "The Behavior Canvas – Academy of Behavioural Science", founded and directed by Reema Singh (QASP-S (QABA, USA) | Behaviour Analyst | Clinical Psychology Researcher | Special Educator).
Official website: https://behaviorcanvas.com | Contact: info@behaviorcanvas.com | Tagline: Crafting Behavior, Creating Change.

Your role:
1. Warmly assist parents, educators, psychology & special education students, behaviour analysts, and researchers with behavioural science concepts (functions of behaviour, positive behaviour support, functional communication training, assent, dignity, reinforcement schedules, and data integrity).
2. Help visitors explore The Behavior Canvas Academy programmes, upcoming workshops, services (Behaviour Consultation, Parent Training, Online Behavioural Support), and digital study resources (ABA Notes – ₹799, ABA Cheat Sheet – ₹299, ABA Question Bank – ₹999, Study Tracker, E-books).
3. Maintain scientific integrity, compassion, inclusion, and clear ethical boundaries. Never claim guaranteed behavioural or examination outcomes, and never present independent Academy certificates as QABA-approved or university-accredited without explicit authorisation.`;

    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply =
        response.text ||
        'I am here to assist you with The Behavior Canvas Academy, workshops, resources, and behavioural science questions.';
      return res.status(200).json({ reply });
    } catch {
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      let fallback = '';

      if (
        lastUserMsg.includes('reema') ||
        lastUserMsg.includes('founder') ||
        lastUserMsg.includes('credential')
      ) {
        fallback = `The Behavior Canvas – Academy of Behavioural Science was founded by **Reema Singh**.\n\nVerified Credentials:\n• QASP-S (QABA, USA)\n• Behaviour Analyst\n• Clinical Psychology Researcher\n• Special Educator\n\nHer work centres compassionate, ethical, evidence-based behavioural science across education, research, parent support, and professional development.`;
      } else if (
        lastUserMsg.includes('study') ||
        lastUserMsg.includes('note') ||
        lastUserMsg.includes('cheat') ||
        lastUserMsg.includes('question') ||
        lastUserMsg.includes('resource')
      ) {
        fallback = `Available Digital Study Resources:\n• **ABA Notes** (₹799) – Structured conceptual guide\n• **ABA Cheat Sheet** (₹299) – High-yield rapid revision matrix\n• **ABA Question Bank** (₹999) – 150+ applied scenario questions & rationales\n• **Study Tracker** (₹149) & **Complete ABA Study Bundle** (₹2,000)\n\nVerified purchases unlock immediately inside your checkout confirmation and Learner Portal.`;
      } else {
        fallback = `Welcome to **The Behavior Canvas – Academy of Behavioural Science**.\n\nHow can I assist you today?\n• Exploring Academy of Behavioural Science programmes\n• Parent Education & Behaviour Consultation enquiries\n• Upcoming Workshops & Certificate Verification\n• ABA Notes, Cheat Sheets, and Scenario Question Banks`;
      }

      return res.status(200).json({ reply: fallback });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message || 'Unable to generate response at this moment.',
    });
  }
}
