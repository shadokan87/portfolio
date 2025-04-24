import { streamText } from 'ai';
import { createAzure } from '@ai-sdk/azure';

const azure = createAzure({
  resourceName: "ai-eclipsetoure3139ai863411562242",
  // baseURL: process.env.AZURE_BASE_URL,
  apiKey: process.env.AZURE_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  return streamText({
    model: azure("gpt-4.1-nano"),
    system: 'You are a helpful assistant.',
    messages,
  }).toDataStreamResponse();
}