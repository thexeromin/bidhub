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
import { useAddProduct } from '@/app/hooks/mutations'
import { Textarea } from '../ui/textarea'

const FormSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  auctionId: z.string(),
})

interface Props {
  id: string
}

export default function AddProductForm({ id }: Props) {
  const { data: sessionData } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const mutation = useAddProduct('Your product listed...')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      auctionId: id,
      name: '',
      description: '',
      location: '',
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
    console.log('hola')
    console.log(!file || !sessionData?.user.accessToken)
    if (!file || !sessionData?.user.accessToken) return

    const formData = new FormData()
    formData.append('photo', file)
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('location', data.location)
    formData.append('auctionId', data.auctionId)

    mutation.mutate({
      payload: formData,
      token: sessionData.user.accessToken,
    })

    form.reset()
    setFile(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Product</CardTitle>
          <CardDescription>
            Enter your details below to list your product on auction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
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
                    'List Product'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
