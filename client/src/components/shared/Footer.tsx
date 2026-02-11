import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-muted/40 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">BidMaster</h3>
            <p className="text-sm text-muted-foreground">
              The premium destination for real-time auctions. Bid, win, and sell
              with confidence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Live Auctions</li>
              <li>Past Winners</li>
              <li>Sell Item</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Safety</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join our newsletter for the latest drops.
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BidMaster Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
