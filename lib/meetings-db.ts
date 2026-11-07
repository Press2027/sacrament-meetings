
import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [
      { description: 'Sustaining of new Primary president' }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering'
    },
    speakers: [
      {
        name: 'Sister Brown',
        topic: 'Faith in Jesus Christ',
        type: 'speaker'
      },
      {
        name: 'Youth Choir',
        topic: '',
        type: 'musical-number'
      }
    ],
    closingHymn: {
      number: 31,
      title: 'O God, Our Help in Ages Past'
    },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Brown',
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Sister Johnson',
    wardBusiness: [
      { description: 'Youth activity announcement' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      {
        name: 'Ward Members',
        topic: 'Personal testimonies',
        type: 'speaker'
      }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Wilson',
    announcements: ['Youth activity: May 15']
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'President Johnson',
    conducting: 'Brother Davis',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Clark',
    wardBusiness: [
      { description: 'Ward missionary updates' }
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      {
        name: 'Elder Thomas',
        topic: 'Serving Others',
        type: 'speaker'
      },
      {
        name: 'Sister White',
        topic: 'The Power of Prayer',
        type: 'speaker'
      }
    ],
    closingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    closingPrayer: 'Sister Green'
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'Stake President Anderson',
    conducting: 'President Johnson',
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Brother Taylor',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      {
        name: 'President Anderson',
        topic: 'Strengthening Families',
        type: 'speaker'
      }
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Taylor',
    announcements: ['Stake conference preparation']
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'general',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 4, title: 'Truth Eternal' },
    openingPrayer: 'Sister Brown',
    wardBusiness: [
      { description: 'Monthly ward council report' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 188, title: 'Thy Will, O Lord, Be Done' },
    speakers: [
      {
        name: 'Brother Davis',
        topic: 'Following Jesus Christ',
        type: 'speaker'
      },
      {
        name: 'Sister Wilson',
        topic: 'Building Strong Families',
        type: 'speaker'
      }
    ],
    closingHymn: { number: 32, title: 'The Happy Day at Last Has Come' },
    closingPrayer: 'Brother Smith'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
