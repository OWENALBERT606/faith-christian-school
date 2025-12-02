
// import DashboardMain from "@/components/dashboard/DashboardMain";
// import OverViewCard from "@/components/OverViewCard";
// import { DashboardWelcome } from "@/components/WelcomeBanner";
// import { getAuthenticatedUser } from "@/config/useAuth";
// import { redirect } from "next/navigation";

// export default async function Dashboard() {
//   const user = await getAuthenticatedUser();
//   return (
//     <main>
//       <DashboardMain />
//     </main>
//   );
// }





import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Heart, 
  TrendingUp, 
  UserPlus,
  Handshake,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Link from 'next/link';
import { db } from '@/prisma/db';
// import { prisma } from '@/lib/prisma';

// Fetch dashboard data
async function getDashboardData() {
  const [
    totalUsers,
    totalMembers,
    totalEvents,
    upcomingEvents,
    totalCampaigns,
    activeCampaigns,
    totalStories,
    totalVolunteers,
    pendingVolunteers,
    totalPartnerships,
    pendingPartnerships,
    totalSponsors,
    totalChildren,
    activeSponsorships,
    totalSponsorshipRevenue,
    recentUsers,
    recentEvents,
    recentCampaigns,
    recentVolunteers,
  ] = await Promise.all([
    db.user.count(),
    db.member.count(),
    db.event.count(),
    db.event.count({ where: { status: 'UPCOMING' } }),
    db.campaign.count(),
    db.campaign.count({ where: { status: 'ACTIVE' } }),
    db.story.count(),
    db.volunteer.count(),
    db.volunteer.count({ where: { status: 'pending' } }),
    db.partnership.count(),
    db.partnership.count({ where: { status: 'pending' } }),
    db.sponsor.count(),
    db.child.count(),
    db.sponsorship.count({ where: { status: 'ACTIVE' } }),
    db.sponsorship.aggregate({
      where: { status: 'ACTIVE' },
      _sum: { monthlyAmount: true }
    }),
    db.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        roles: { select: { displayName: true } }
      }
    }),
    db.event.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        date: true,
        location: true,
        status: true,
        attendees: true,
        image: true
      }
    }),
    db.campaign.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        goal: true,
        raised: true,
        status: true,
        image: true,
        supporters: true
      }
    }),
    db.volunteer.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        status: true,
        createdAt: true,
        interests: true
      }
    })
  ]);

  // Calculate campaign progress
  const campaignStats = await db.campaign.aggregate({
    _sum: { goal: true, raised: true, supporters: true }
  });

  return {
    metrics: {
      users: { total: totalUsers, change: '+12%' },
      members: { total: totalMembers, change: '+5%' },
      events: { total: totalEvents, upcoming: upcomingEvents, change: '+8%' },
      campaigns: { 
        total: totalCampaigns, 
        active: activeCampaigns, 
        totalGoal: campaignStats._sum.goal || 0,
        totalRaised: campaignStats._sum.raised || 0,
        totalSupporters: campaignStats._sum.supporters || 0,
        change: '+15%' 
      },
      stories: { total: totalStories, change: '+20%' },
      volunteers: { 
        total: totalVolunteers, 
        pending: pendingVolunteers,
        change: '+25%' 
      },
      partnerships: { 
        total: totalPartnerships, 
        pending: pendingPartnerships,
        change: '+10%' 
      },
      sponsorships: {
        sponsors: totalSponsors,
        children: totalChildren,
        active: activeSponsorships,
        monthlyRevenue: totalSponsorshipRevenue._sum.monthlyAmount || 0,
        change: '+18%'
      }
    },
    recent: {
      users: recentUsers,
      events: recentEvents,
      campaigns: recentCampaigns,
      volunteers: recentVolunteers
    }
  };
}

// Stat card component
function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue,
  href 
}: { 
  title: string;
  value: string | number;
  description: string;
  icon: any;
  trend?: 'up' | 'down';
  trendValue?: string;
  href?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground">{description}</p>
          {trend && trendValue && (
            <div className={`flex items-center text-xs ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {href && (
          <Link href={href}>
            <Button variant="link" className="px-0 mt-2 h-auto text-xs">
              View details →
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    UPCOMING: { label: 'Upcoming', variant: 'default' },
    ONGOING: { label: 'Ongoing', variant: 'secondary' },
    COMPLETED: { label: 'Completed', variant: 'outline' },
    CANCELLED: { label: 'Cancelled', variant: 'destructive' },
    ACTIVE: { label: 'Active', variant: 'default' },
    PAUSED: { label: 'Paused', variant: 'outline' },
    pending: { label: 'Pending', variant: 'outline' },
    approved: { label: 'Approved', variant: 'default' },
    rejected: { label: 'Rejected', variant: 'destructive' },
  };

  const config = variants[status] || { label: status, variant: 'outline' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default async function AdminDashboardOverview() {
  const data = await getDashboardData();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Monitor your organization's key metrics and activities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={data.metrics.users.total}
          description="Registered users"
          icon={Users}
          trend="up"
          trendValue={data.metrics.users.change}
          href="/admin/users"
        />
        <StatCard
          title="Active Campaigns"
          value={data.metrics.campaigns.active}
          description={`${data.metrics.campaigns.total} total campaigns`}
          icon={Heart}
          trend="up"
          trendValue={data.metrics.campaigns.change}
          href="/admin/campaigns"
        />
        <StatCard
          title="Upcoming Events"
          value={data.metrics.events.upcoming}
          description={`${data.metrics.events.total} total events`}
          icon={Calendar}
          trend="up"
          trendValue={data.metrics.events.change}
          href="/admin/events"
        />
        <StatCard
          title="Monthly Sponsorships"
          value={`$${data.metrics.sponsorships.monthlyRevenue.toLocaleString()}`}
          description={`${data.metrics.sponsorships.active} active sponsorships`}
          icon={DollarSign}
          trend="up"
          trendValue={data.metrics.sponsorships.change}
          href="/admin/sponsorships"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending Volunteers"
          value={data.metrics.volunteers.pending}
          description={`${data.metrics.volunteers.total} total volunteers`}
          icon={UserPlus}
          trend="up"
          trendValue={data.metrics.volunteers.change}
          href="/admin/volunteers"
        />
        <StatCard
          title="Pending Partnerships"
          value={data.metrics.partnerships.pending}
          description={`${data.metrics.partnerships.total} total partnerships`}
          icon={Handshake}
          trend="up"
          trendValue={data.metrics.partnerships.change}
          href="/admin/partnerships"
        />
        <StatCard
          title="Published Stories"
          value={data.metrics.stories.total}
          description="Impact stories shared"
          icon={FileText}
          trend="up"
          trendValue={data.metrics.stories.change}
          href="/admin/stories"
        />
        <StatCard
          title="Sponsored Children"
          value={data.metrics.sponsorships.children}
          description={`${data.metrics.sponsorships.sponsors} sponsors`}
          icon={Heart}
          trend="up"
          trendValue={data.metrics.sponsorships.change}
          href="/admin/children"
        />
      </div>

      {/* Campaign Progress & Alerts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Campaign Overview */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Overall fundraising progress across all campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Goal</p>
                  <p className="text-2xl font-bold">
                    ${data.metrics.campaigns.totalGoal.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${data.metrics.campaigns.totalRaised.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">
                    {Math.round((data.metrics.campaigns.totalRaised / data.metrics.campaigns.totalGoal) * 100)}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all" 
                  style={{ 
                    width: `${Math.min((data.metrics.campaigns.totalRaised / data.metrics.campaigns.totalGoal) * 100, 100)}%` 
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {data.metrics.campaigns.totalSupporters} total supporters
                </span>
                <Link href="/admin/campaigns">
                  <Button variant="link" size="sm">View all campaigns →</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Alerts */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.metrics.volunteers.pending > 0 && (
              <Link href="/admin/volunteers">
                <div className="flex items-center p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <AlertCircle className="h-4 w-4 text-orange-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pending Volunteers</p>
                    <p className="text-xs text-muted-foreground">
                      {data.metrics.volunteers.pending} applications to review
                    </p>
                  </div>
                </div>
              </Link>
            )}
            {data.metrics.partnerships.pending > 0 && (
              <Link href="/admin/partnerships">
                <div className="flex items-center p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <Clock className="h-4 w-4 text-blue-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pending Partnerships</p>
                    <p className="text-xs text-muted-foreground">
                      {data.metrics.partnerships.pending} requests to review
                    </p>
                  </div>
                </div>
              </Link>
            )}
            {data.metrics.events.upcoming > 0 && (
              <Link href="/admin/events">
                <div className="flex items-center p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Upcoming Events</p>
                    <p className="text-xs text-muted-foreground">
                      {data.metrics.events.upcoming} events scheduled
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Recent Users</TabsTrigger>
          <TabsTrigger value="events">Recent Events</TabsTrigger>
          <TabsTrigger value="campaigns">Recent Campaigns</TabsTrigger>
          <TabsTrigger value="volunteers">Recent Volunteers</TabsTrigger>
        </TabsList>

        {/* Recent Users */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Registered Users</CardTitle>
              <CardDescription>
                Latest users who joined your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recent.users.map((user:any) => (
                  <div key={user.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image || undefined} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map((n:any)=> n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {user.roles.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {user.roles[0].displayName}
                        </Badge>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/users">
                <Button variant="outline" className="w-full mt-4">
                  View all users
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Events */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Created Events</CardTitle>
              <CardDescription>
                Latest events added to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recent.events.map((event:any) => (
                  <div key={event.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date} • {event.location}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.attendees} attendees
                      </p>
                    </div>
                    <StatusBadge status={event.status} />
                  </div>
                ))}
              </div>
              <Link href="/admin/events">
                <Button variant="outline" className="w-full mt-4">
                  View all events
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Campaigns */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Created Campaigns</CardTitle>
              <CardDescription>
                Latest fundraising campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recent.campaigns.map((campaign:any) => (
                  <div key={campaign.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={campaign.image} 
                        alt={campaign.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{campaign.title}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[120px] bg-secondary rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{ 
                              width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` 
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {campaign.supporters} supporters
                      </p>
                    </div>
                    <StatusBadge status={campaign.status} />
                  </div>
                ))}
              </div>
              <Link href="/admin/campaigns">
                <Button variant="outline" className="w-full mt-4">
                  View all campaigns
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Volunteers */}
        <TabsContent value="volunteers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Volunteer Applications</CardTitle>
              <CardDescription>
                Latest volunteer sign-ups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recent.volunteers.map((volunteer:any) => (
                  <div key={volunteer.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {volunteer.fullName.split(' ').map((n:any) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">
                        {volunteer.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {volunteer.email}
                      </p>
                      {volunteer.interests.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Interests: {volunteer.interests.slice(0, 2).join(', ')}
                          {volunteer.interests.length > 2 && '...'}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StatusBadge status={volunteer.status} />
                      <p className="text-xs text-muted-foreground">
                        {new Date(volunteer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/volunteers">
                <Button variant="outline" className="w-full mt-4">
                  View all volunteers
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
