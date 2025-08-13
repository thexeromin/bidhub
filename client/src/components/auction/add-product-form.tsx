'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createAuctionCallBack } from '@/app/hooks/mutations'
import { Textarea } from '../ui/textarea'

const FormSchema = z.object({
    title: z.string(),
    description: z.string(),
})

const AddProductForm: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
    className,
    ...props
}) => {
    const mutation = createAuctionCallBack('Auction created')
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    })

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
        data,
    ) => {
        // mutation.mutate(data)
        form.reset()
    }

    return (
        <>
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">List Product</CardTitle>
                        <CardDescription>
                            Enter your details below to list product
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        variant="brand"
                                        disabled={mutation.isPending}
                                    >
                                        {mutation.isPending ? (
                                            <>
                                                <Loader2 className="animate-spin" />
                                                Please wait
                                            </>
                                        ) : (
                                            'Submit'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default AddProductForm
