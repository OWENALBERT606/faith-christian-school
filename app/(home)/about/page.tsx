import { AboutHero } from "@/components/about/about-hero"
import { CoreValues } from "@/components/about/core-values"
import { ImpactStats } from "@/components/about/impact-stats"
import { LeaderProfile } from "@/components/about/leader-profile"
import { MissionVision } from "@/components/about/mission-vission"
import { OurStory } from "@/components/about/our-story"
import { TeamMembers } from "@/components/about/team"
import { Timeline } from "@/components/about/timeline"
import react from "react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <div className="px-4 md:px-12 lg:px-24">
      <OurStory />
        <MissionVision />
      <LeaderProfile />
      <CoreValues />
      {/* <Timeline /> */}
      <TeamMembers />
      <ImpactStats />
      </div>
    </main>
  )
}
