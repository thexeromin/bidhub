'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
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
import { useCreateAuction } from '@/app/hooks/mutations'
import { Textarea } from '../ui/textarea'

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const CreateAuctionForm: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
  ...props
}) => {
  const { data: sessionData } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const mutation = useCreateAuction('Auction created')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const file = acceptedFiles[0]
      if (file) {
        setFile(acceptedFiles[0] || null)
      }
      if (fileRejections.length > 0) {
        console.warn('Rejected file(s):', fileRejections)
      }
    },
    [],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    if (!file || !sessionData?.user.accessToken) return
    const formData = new FormData()
    formData.append('photo', file)
    formData.append('title', data.title)
    formData.append('description', data.description)

    mutation.mutate({
      payload: formData,
      token: sessionData.user.accessToken,
    })
    form.reset()
    setFile(null)
  }

  return (
    <React.Fragment {...props}>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Auction</CardTitle>
            <CardDescription>
              Enter your details below to create a new auction
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-300 p-5 rounded-lg cursor-pointer flex flex-col items-center justify-center text-center"
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the file here ...</p>
                    ) : file ? (
                      <>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-gray-500 text-sm">
                          Drag & drop to replace
                        </p>
                      </>
                    ) : (
                      <p>Drag & drop a file here, or click to select</p>
                    )}
                  </div>

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
                      'Create Auction'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default CreateAuctionForm
