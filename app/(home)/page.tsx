
import React from 'react'
import { HeroSlider } from '../../components/hero-slider'
import CustomCarousel from '@/components/slider'
import { Navigation } from '@/components/site/navigation'
import { HeroSection } from '@/components/site/hero-section'
import { AboutSection } from '@/components/site/about-section'
import { ProgramsSection } from '@/components/site/programs-section'
import { ValuesSection } from '@/components/site/values-section'
import { StatsSection } from '@/components/site/stats-section'
import { TestimonialsSection } from '@/components/site/testimonials'
import { CTASection } from '@/components/site/cta-section'
import { StoriesSection } from '@/components/site/stories-sction'
import { CampaignsSection } from '@/components/site/campaigns-section'
import { EventsSection } from '@/components/site/events-section'
import { getEvents } from '@/actions/events'
import { getCampaigns } from '@/actions/campaigns'
import { getStories } from '@/actions/stories'

export default async function Page() {
      const campaigns = (await getCampaigns()) ?? [];
      const events = (await getEvents()) ?? [];
      const stories = (await getStories()) ?? [];
          
      
  
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ValuesSection />
      <StoriesSection stories={stories} />
      <CampaignsSection campaigns={campaigns} />
      <EventsSection events={events} />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
