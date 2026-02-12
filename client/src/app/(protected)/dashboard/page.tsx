'use client'

import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfileForm } from '@/components/dashboard/ProfileForm'
import { ActiveBids } from '@/components/dashboard/ActiveBids'
import { WonAuctions } from '@/components/dashboard/WonAuctions'
import { Trophy, Gavel, UserCog, Plus } from 'lucide-react' // 3. Import Plus Icon

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName || 'Bidder'}. Here is an overview of
            your activity.
          </p>
        </div>

        {/* 👇 ADDED: Create Auction Button */}
        <div className="flex items-center gap-2">
          <Link href="/auction/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Auction
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* ... (Keep your existing Cards code here) ... */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Won</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Valued at $450.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Auctions
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Ending soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="active-bids" className="space-y-4">
        {/* ... (Keep your Tabs code here) ... */}
        <TabsList>
          <TabsTrigger value="active-bids" className="gap-2">
            <Gavel className="h-4 w-4" /> Active Bids
          </TabsTrigger>
          <TabsTrigger value="won-auctions" className="gap-2">
            <Trophy className="h-4 w-4" /> Won Items
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <UserCog className="h-4 w-4" /> Profile Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active-bids" className="space-y-4">
          <ActiveBids />
        </TabsContent>

        <TabsContent value="won-auctions" className="space-y-4">
          <WonAuctions />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <ProfileForm user={user} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
