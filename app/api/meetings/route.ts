
import { connection } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  // Keep this outside try/catch so Next.js can handle prerender interruption.
  await connection();

  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const meetings = getMeetings(date);

    return Response.json(meetings, { status: 200 });
  } catch (error) {
    console.error('Failed to retrieve meetings:', error);

    return Response.json(
      { error: 'Failed to retrieve meetings.' },
      { status: 500 }
    );
  }
}
