import ViewSpecificAuction from '@/components/auction/view-specific-auction'
import Main from '@/components/template/main'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <Main title={`Auction #${slug}`}>
      <ViewSpecificAuction id={slug} />
    </Main>
  )
}
