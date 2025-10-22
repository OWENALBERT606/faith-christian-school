import { getEvents } from '@/actions/events';
import EventsListing from '@/components/events-listing'
import React from 'react'

export default async function Page() {
  const events = (await getEvents()) ?? [];
  return (
    <div>
      <EventsListing events={events} />
    </div>
  )
}
