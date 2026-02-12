'use client'

import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader2, Upload, X, ImagePlus, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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

import { auctionSchema, type AuctionInput } from '@/lib/validations/auction'
import { auctionService } from '@/services/auction'

export default function CreateAuctionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // File State
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const form = useForm<AuctionInput>({
    resolver: zodResolver(auctionSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Manual Validation for File Size (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File is too large. Max size is 5MB.')
        return
      }
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  // Remove Selected File
  const clearFile = () => {
    setFile(null)
    if (preview) URL.revokeObjectURL(preview) // Cleanup memory
    setPreview(null)
  }

  // Submit Handler
  async function onSubmit(data: AuctionInput) {
    if (!file) {
      toast.error('Please upload a cover image for the auction')
      return
    }

    setIsLoading(true)
    try {
      await auctionService.create(data, file)

      toast.success('Auction event created successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Create Auction Error:', error)

      let message = 'Failed to create auction'

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message
      }

      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="pl-0 hover:bg-transparent hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <ImagePlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Create Auction Event</CardTitle>
          <CardDescription>
            Launch a new weekly auction to group products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Cyber Week Sale (Feb 12-14)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the theme of this auction event..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload UI */}
              <div className="space-y-2">
                <FormLabel>Cover Photo</FormLabel>
                {!preview ? (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border-muted-foreground/25">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG or WEBP (Max 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <Image
                      src={preview}
                      alt="Cover Preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-md"
                      onClick={clearFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Event...
                  </>
                ) : (
                  'Launch Auction'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
