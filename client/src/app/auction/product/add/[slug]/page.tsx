import AddProductForm from '@/components/auction/add-product-form'
import Main from '@/components/template/main'

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    return (
        <Main title="List Product">
            <div className="flex min-h-[70svh] w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <AddProductForm />
                </div>
            </div>
        </Main>
    )
}
