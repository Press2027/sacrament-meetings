import { connection } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  await connection();

  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const meetings = await getMeetings('', 1, date);

    return Response.json(meetings, { status: 200 });
  } catch (error) {
    console.error('Failed to retrieve meetings:', error);

    return Response.json(
      { error: 'Failed to retrieve meetings.' },
      { status: 500 }
    );
  }
}
