
'use client';

import { useActionState } from 'react';
import type { SacramentMeeting } from '@/lib/types';
import type { MeetingFormState } from '@/lib/actions';

interface MeetingFormProps {
  action: (
    state: MeetingFormState,
    formData: FormData
  ) => Promise<MeetingFormState>;
  initialData?: SacramentMeeting;
  submitLabel: string;
}

const initialState: MeetingFormState = {
  message: '',
  errors: {},
};

function FieldError({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  if (!errors?.length) return null;

  return (
    <ul id={id} aria-live="polite" className="mt-1 text-sm text-red-700">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}

export default function MeetingForm({
  action,
  initialData,
  submitLabel,
}: MeetingFormProps) {
  const [state, formAction, pending] = useActionState(
    action,
    initialState
  );

  const errors = state.errors ?? {};

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200';

  const labelClass = 'block text-sm font-semibold text-gray-800';

  return (
    <form action={formAction} className="space-y-8">
      {state.message && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-4 text-sm text-red-800"
        >
          {state.message}
        </p>
      )}

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Meeting Information
        </h2>

        <div>
          <label htmlFor="date" className={labelClass}>Meeting Date</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={initialData?.date ?? ''}
            aria-describedby="date-error"
            className={inputClass}
          />
          <FieldError id="date-error" errors={errors.date} />
        </div>

        <div>
          <label htmlFor="meetingType" className={labelClass}>Meeting Type</label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={initialData?.meetingType ?? 'regular'}
            className={inputClass}
            aria-describedby="meetingType-error"
          >
            {['testimony', 'regular', 'stake', 'general', 'special'].map(
              (type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              )
            )}
          </select>
          <FieldError id="meetingType-error" errors={errors.meetingType} />
        </div>

        <div>
          <label htmlFor="presiding" className={labelClass}>Presiding</label>
          <input
            id="presiding"
            name="presiding"
            required
            defaultValue={initialData?.presiding ?? ''}
            className={inputClass}
            aria-describedby="presiding-error"
          />
          <FieldError id="presiding-error" errors={errors.presiding} />
        </div>

        <div>
          <label htmlFor="conducting" className={labelClass}>Conducting</label>
          <input
            id="conducting"
            name="conducting"
            required
            defaultValue={initialData?.conducting ?? ''}
            className={inputClass}
            aria-describedby="conducting-error"
          />
          <FieldError id="conducting-error" errors={errors.conducting} />
        </div>

        <div>
          <label htmlFor="announcements" className={labelClass}>
            Announcements (one per line)
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={initialData?.announcements?.join('\n') ?? ''}
            className={inputClass}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">Opening</h2>

        <div>
          <label htmlFor="openingHymnNumber" className={labelClass}>
            Opening Hymn Number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min="1"
            required
            defaultValue={initialData?.openingHymn.number ?? ''}
            className={inputClass}
            aria-describedby="openingHymnNumber-error"
          />
          <FieldError
            id="openingHymnNumber-error"
            errors={errors.openingHymnNumber}
          />
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className={labelClass}>
            Opening Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            required
            defaultValue={initialData?.openingHymn.title ?? ''}
            className={inputClass}
            aria-describedby="openingHymnTitle-error"
          />
          <FieldError
            id="openingHymnTitle-error"
            errors={errors.openingHymnTitle}
          />
        </div>

        <div>
          <label htmlFor="openingPrayer" className={labelClass}>
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            required
            defaultValue={initialData?.openingPrayer ?? ''}
            className={inputClass}
            aria-describedby="openingPrayer-error"
          />
          <FieldError
            id="openingPrayer-error"
            errors={errors.openingPrayer}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">Ward Business</h2>

        <div>
          <label htmlFor="wardBusiness" className={labelClass}>
            Ward Business (one item per line)
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={4}
            defaultValue={
              initialData?.wardBusiness
                .map((item) => item.description)
                .join('\n') ?? ''
            }
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={initialData?.stakeBusiness ?? false}
            className="h-4 w-4"
          />
          <label htmlFor="stakeBusiness" className="text-sm font-medium text-gray-800">
            Include stake business
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">Sacrament</h2>

        <div>
          <label htmlFor="sacramentHymnNumber" className={labelClass}>
            Sacrament Hymn Number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min="1"
            required
            defaultValue={initialData?.sacramentHymn.number ?? ''}
            className={inputClass}
            aria-describedby="sacramentHymnNumber-error"
          />
          <FieldError
            id="sacramentHymnNumber-error"
            errors={errors.sacramentHymnNumber}
          />
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className={labelClass}>
            Sacrament Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            required
            defaultValue={initialData?.sacramentHymn.title ?? ''}
            className={inputClass}
            aria-describedby="sacramentHymnTitle-error"
          />
          <FieldError
            id="sacramentHymnTitle-error"
            errors={errors.sacramentHymnTitle}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Speakers and Musical Numbers
        </h2>

        <div>
          <label htmlFor="speakers" className={labelClass}>
            Speakers (one per line)
          </label>
          <p className="mt-1 text-sm text-gray-500">
            Format: Name | Topic | speaker or musical-number
          </p>
          <textarea
            id="speakers"
            name="speakers"
            rows={5}
            defaultValue={
              initialData?.speakers
                .map((item) => `${item.name} | ${item.topic} | ${item.type}`)
                .join('\n') ?? ''
            }
            className={inputClass}
            aria-describedby="speakers-error"
          />
          <FieldError id="speakers-error" errors={errors.speakers} />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">Closing</h2>

        <div>
          <label htmlFor="closingHymnNumber" className={labelClass}>
            Closing Hymn Number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            required
            defaultValue={initialData?.closingHymn.number ?? ''}
            className={inputClass}
            aria-describedby="closingHymnNumber-error"
          />
          <FieldError
            id="closingHymnNumber-error"
            errors={errors.closingHymnNumber}
          />
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className={labelClass}>
            Closing Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            required
            defaultValue={initialData?.closingHymn.title ?? ''}
            className={inputClass}
            aria-describedby="closingHymnTitle-error"
          />
          <FieldError
            id="closingHymnTitle-error"
            errors={errors.closingHymnTitle}
          />
        </div>

        <div>
          <label htmlFor="closingPrayer" className={labelClass}>
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            required
            defaultValue={initialData?.closingPrayer ?? ''}
            className={inputClass}
            aria-describedby="closingPrayer-error"
          />
          <FieldError
            id="closingPrayer-error"
            errors={errors.closingPrayer}
          />
        </div>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Saving meeting...' : submitLabel}
      </button>
    </form>
  );
}
