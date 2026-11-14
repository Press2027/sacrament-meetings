import { neon } from '@neondatabase/serverless';
import type {
  SacramentMeeting,
  MeetingType,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
} from './types';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not configured.');
}

const sql = neon(databaseUrl);

export const ITEMS_PER_PAGE = 5;

interface MeetingRow {
  id: number;
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  closingHymn: Hymn;
  closingPrayer: string;
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meetingType,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.openingHymn,
    openingPrayer: row.openingPrayer,
    wardBusiness: row.wardBusiness ?? [],
    stakeBusiness: row.stakeBusiness,
    sacramentHymn: row.sacramentHymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closingHymn,
    closingPrayer: row.closingPrayer,
  };
}

export async function getMeetings(
  query = '',
  currentPage = 1,
  date?: string | null
): Promise<SacramentMeeting[]> {
  const page =
    Number.isInteger(currentPage) && currentPage > 0
      ? currentPage
      : 1;

  const offset = (page - 1) * ITEMS_PER_PAGE;
  const searchTerm = `%${query.trim()}%`;

  const rows = date
    ? await sql`
        SELECT
          id,
          date::text AS date,
          meeting_type AS "meetingType",
          presiding,
          conducting,
          announcements,
          opening_hymn AS "openingHymn",
          opening_prayer AS "openingPrayer",
          ward_business AS "wardBusiness",
          stake_business AS "stakeBusiness",
          sacrament_hymn AS "sacramentHymn",
          speakers,
          closing_hymn AS "closingHymn",
          closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE date = ${date}::date
          AND (
            ${query.trim()} = ''
            OR presiding ILIKE ${searchTerm}
            OR conducting ILIKE ${searchTerm}
            OR meeting_type::text ILIKE ${searchTerm}
            OR speakers::text ILIKE ${searchTerm}
          )
        ORDER BY date DESC, id DESC
        LIMIT ${ITEMS_PER_PAGE}
        OFFSET ${offset}
      `
    : await sql`
        SELECT
          id,
          date::text AS date,
          meeting_type AS "meetingType",
          presiding,
          conducting,
          announcements,
          opening_hymn AS "openingHymn",
          opening_prayer AS "openingPrayer",
          ward_business AS "wardBusiness",
          stake_business AS "stakeBusiness",
          sacrament_hymn AS "sacramentHymn",
          speakers,
          closing_hymn AS "closingHymn",
          closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE
          ${query.trim()} = ''
          OR presiding ILIKE ${searchTerm}
          OR conducting ILIKE ${searchTerm}
          OR meeting_type::text ILIKE ${searchTerm}
          OR speakers::text ILIKE ${searchTerm}
        ORDER BY date DESC, id DESC
        LIMIT ${ITEMS_PER_PAGE}
        OFFSET ${offset}
      `;

  return (rows as unknown as MeetingRow[]).map(mapMeeting);
}

export async function getMeetingsTotalPages(
  query = ''
): Promise<number> {
  const searchTerm = `%${query.trim()}%`;

  const rows = await sql`
    SELECT COUNT(*)::int AS total
    FROM meetings
    WHERE
      ${query.trim()} = ''
      OR presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type::text ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  const total = Number(rows[0]?.total ?? 0);

  return Math.ceil(total / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      date::text AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  const meetingRows = rows as unknown as MeetingRow[];

  return meetingRows.length > 0
    ? mapMeeting(meetingRows[0])
    : null;
}

// Week 04 database mutations: signatures are prepared but not implemented.

export async function addMeeting(
  _data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  void _data;
  throw new Error('addMeeting will be implemented in Week 04.');
}

export async function updateMeeting(
  _id: number,
  _updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  void _id;
  void _updates;
  throw new Error('updateMeeting will be implemented in Week 04.');
}

export async function deleteMeeting(
  _id: number
): Promise<boolean> {
  void _id;
  throw new Error('deleteMeeting will be implemented in Week 04.');
}
