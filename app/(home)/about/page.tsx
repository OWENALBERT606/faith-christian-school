import { getMembers } from "@/actions/members"
import { AboutHero } from "@/components/about/about-hero"
import { CoreValues } from "@/components/about/core-values"
import { ImpactStats } from "@/components/about/impact-stats"
import { LeaderProfile } from "@/components/about/leader-profile"
import { MissionVision } from "@/components/about/mission-vission"
import { OurStory } from "@/components/about/our-story"
import { TeamMembers } from "@/components/about/team"
import { Timeline } from "@/components/about/timeline"
import { Member } from "@prisma/client"
import react from "react"

export default async function AboutPage() {
  const members: Member[] = (await getMembers()) || [];
  return (
    <main className="min-h-screen">
      <AboutHero />
      <div className="px-4 md:px-12 lg:px-24">
      <OurStory />
        <MissionVision />
      <LeaderProfile />
      <CoreValues />
      {/* <Timeline /> */}
      <TeamMembers members={members}/>
      <ImpactStats />
      </div>
    </main>
  )
}
