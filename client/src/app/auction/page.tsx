import ViewAllAuction from '@/components/auction/view-all-auction'
import Main from '@/components/template/main'

export default function Page() {
  return (
    <Main title="Ongoing auctions">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ViewAllAuction />
      </div>
    </Main>
  )
}
