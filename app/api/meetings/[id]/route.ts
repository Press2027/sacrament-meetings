
import { getMeetingById } from '@/lib/meetings-db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
      return Response.json(
        { error: 'Invalid meeting ID. Please provide a valid number.' },
        { status: 400 }
      );
    }

    const meeting = getMeetingById(meetingId);

    if (!meeting) {
      return Response.json(
        { error: 'Meeting not found.' },
        { status: 404 }
      );
    }

    return Response.json(meeting, { status: 200 });
  } catch (error) {
    console.error('Failed to retrieve meeting:', error);

    return Response.json(
      { error: 'Failed to retrieve meeting.' },
      { status: 500 }
    );
  }
}
