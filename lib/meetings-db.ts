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


// Week 04 database mutations

export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date}::date,
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements ?? []},
      ${JSON.stringify(data.openingHymn)}::jsonb,
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)}::jsonb,
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)}::jsonb,
      ${JSON.stringify(data.speakers)}::jsonb,
      ${JSON.stringify(data.closingHymn)}::jsonb,
      ${data.closingPrayer}
    )
    RETURNING
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
  `;

  return mapMeeting(rows[0] as unknown as MeetingRow);
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  const existing = await getMeetingById(id);

  if (!existing) {
    return null;
  }

  const data: SacramentMeeting = {
    ...existing,
    ...updates,
    id,
  };

  const rows = await sql`
    UPDATE meetings
    SET
      date = ${data.date}::date,
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ${data.announcements ?? []},
      opening_hymn = ${JSON.stringify(data.openingHymn)}::jsonb,
      opening_prayer = ${data.openingPrayer},
      ward_business = ${JSON.stringify(data.wardBusiness)}::jsonb,
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(data.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(data.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(data.closingHymn)}::jsonb,
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
    RETURNING
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
  `;

  return rows.length > 0
    ? mapMeeting(rows[0] as unknown as MeetingRow)
    : null;
}

export async function deleteMeeting(
  id: number
): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}
