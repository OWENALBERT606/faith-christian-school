import { getStories } from '@/actions/stories';
import StoriesListing from '@/components/storiesListing';
import React from 'react'

export default async function Page() {
  const stories = (await getStories()) ?? [];
  return (
    <div>
      <StoriesListing stories={stories} />
    </div>
  )
}
