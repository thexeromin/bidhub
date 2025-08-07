import CreateAuctionForm from '@/components/auction/create-auction-form'

export default function Page() {
    return (
        <div className="flex min-h-[70svh] w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <CreateAuctionForm />
            </div>
        </div>
    )
}
