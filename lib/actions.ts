
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  addMeeting,
  updateMeeting as updateMeetingInDatabase,
  deleteMeeting as deleteMeetingFromDatabase,
} from '@/lib/meetings-db';

export interface MeetingFormState {
  message: string;
  errors?: Record<string, string[]>;
}

const meetingSchema = z.object({
date: z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Please enter a valid meeting date.'
  )
  .refine((value) => {
    const parsedDate = new Date(`${value}T00:00:00.000Z`);

    return (
      !Number.isNaN(parsedDate.getTime()) &&
      parsedDate.toISOString().slice(0, 10) === value
    );
  }, 'Please enter a real calendar date.'),
  
  meetingType: z.enum([
    'testimony',
    'regular',
    'stake',
    'general',
    'special',
  ]),
  presiding: z.string().trim().min(1, 'Presiding name is required.'),
  conducting: z.string().trim().min(1, 'Conducting name is required.'),
  announcements: z.string().optional().default(''),
  openingHymnNumber: z.coerce.number().int().positive(),
  openingHymnTitle: z.string().trim().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
  wardBusiness: z.string().optional().default(''),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: z.coerce.number().int().positive(),
  sacramentHymnTitle: z.string().trim().min(1, 'Sacrament hymn title is required.'),
  speakers: z.string().optional().default(''),
  closingHymnNumber: z.coerce.number().int().positive(),
  closingHymnTitle: z.string().trim().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
});

function parseMeetingForm(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  const parsed = meetingSchema.safeParse({
    ...rawData,
    stakeBusiness: formData.get('stakeBusiness') === 'on',
  });

  if (!parsed.success) {
    return {
      success: false as const,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  const speakers = data.speakers
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = '', topic = '', type = 'speaker'] = line.split('|');

      return {
        name: name.trim(),
        topic: topic.trim(),
        type: type.trim() as 'speaker' | 'musical-number',
      };
    });

  const invalidSpeaker = speakers.some(
    (speaker) =>
      !speaker.name ||
      !speaker.topic ||
      !['speaker', 'musical-number'].includes(speaker.type)
  );

  if (invalidSpeaker) {
    return {
      success: false as const,
      errors: {
        speakers: [
          'Enter each speaker on a separate line using: Name | Topic | speaker or musical-number.',
        ],
      },
    };
  }

  return {
    success: true as const,
    data: {
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: data.announcements
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      openingHymn: {
        number: data.openingHymnNumber,
        title: data.openingHymnTitle,
      },
      openingPrayer: data.openingPrayer,
      wardBusiness: data.wardBusiness
        .split('\n')
        .map((description) => description.trim())
        .filter(Boolean)
        .map((description) => ({ description })),
      stakeBusiness: data.stakeBusiness,
      sacramentHymn: {
        number: data.sacramentHymnNumber,
        title: data.sacramentHymnTitle,
      },
      speakers,
      closingHymn: {
        number: data.closingHymnNumber,
        title: data.closingHymnTitle,
      },
      closingPrayer: data.closingPrayer,
    },
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const result = parseMeetingForm(formData);

  if (!result.success) {
    return {
      message: 'Please correct the errors below.',
      errors: result.errors,
    };
  }

  let meetingId: number;

  try {
    const meeting = await addMeeting(result.data);
    meetingId = meeting.id;
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error(
      'We could not create the meeting. Please check the information and try again.'
    );
  }

  revalidatePath('/meetings');
  redirect(`/meetings/${meetingId}`);
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const result = parseMeetingForm(formData);

  if (!result.success) {
    return {
      message: 'Please correct the errors below.',
      errors: result.errors,
    };
  }

  try {
    const meeting = await updateMeetingInDatabase(id, result.data);

    if (!meeting) {
      return {
        message: 'This meeting could not be found.',
      };
    }
  } catch (error) {
    console.error('Failed to update meeting:', error);
    throw new Error(
      'We could not update the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect(`/meetings/${id}`);
}

export async function deleteMeeting(
  id: number,
  _formData: FormData
): Promise<void> {
      void _formData;
  try {
    const deleted = await deleteMeetingFromDatabase(id);

    if (!deleted) {
      throw new Error('Meeting not found.');
    }
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error(
      'We could not delete the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
