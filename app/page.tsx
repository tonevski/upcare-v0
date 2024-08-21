'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import {
  ActivityIcon,
  BarChartIcon,
  ShieldCheckIcon,
  MoreHorizontalIcon,
} from 'lucide-react'
import { subscribeToEarlyAccess } from './actions'

function Header() {
  return (
    <header className='w-full py-4 px-4 sm:px-6 lg:px-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 border-b'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <div className='text-2xl font-bold text-primary'>UpCare</div>
      </div>
    </header>
  )
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await subscribeToEarlyAccess(email)

      if (result.success) {
        toast({
          title: 'Subscribed!',
          description: "You've been added to our early access list.",
        })
        setEmail('')
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      title: 'Status',
      description:
        "Real-time monitoring of your website's uptime and performance.",
      icon: ActivityIcon,
    },
    {
      title: 'Analytics',
      description:
        "Detailed insights into your site's traffic and user behavior.",
      icon: BarChartIcon,
    },
    {
      title: 'Security',
      description: 'Advanced protection against threats and vulnerabilities.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'More',
      description:
        'Additional features to enhance your website management experience.',
      icon: MoreHorizontalIcon,
    },
  ]

  return (
    <>
      <Header />
      <main className='flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/20 pt-20'>
        <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]' />
        </div>
        <Card className='w-full max-w-2xl mb-12'>
          <CardContent className='flex flex-col items-center space-y-6 p-8'>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className='text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl lg:text-6xl'>
                Monitor. Analyze. Optimize.
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className='text-muted-foreground text-center md:text-xl'>
                The next generation for website monitoring.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='w-full max-w-md space-y-2'
            >
              <form
                onSubmit={handleSubmit}
                className='flex flex-col sm:flex-row gap-2'
              >
                <Input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='flex-grow'
                  required
                />
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                </Button>
              </form>
              <p className='text-xs text-muted-foreground text-center'>
                Join our waitlist for exclusive early access.
              </p>
            </motion.div>
          </CardContent>
        </Card>

        <div className='w-full max-w-5xl grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <feature.icon className='h-5 w-5' />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Toaster />
      </main>
    </>
  )
}
