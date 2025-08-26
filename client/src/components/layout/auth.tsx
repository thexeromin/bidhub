import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ReactNode } from 'react'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  title: string
  subtitle: string
  children: ReactNode
}

export default function Auth(props: Props) {
  const { className, title, subtitle, ...restProps } = props

  return (
    <div className={cn('flex flex-col gap-6', className)} {...restProps}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>{props.children}</CardContent>
      </Card>
    </div>
  )
}
