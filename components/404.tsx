"use client";
import React from 'react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

interface NotFoundProps {
  message: string;
  buttonText?: string;
  title: string;
  description: string;
  href?: string;
  buttonFn?: () => void;
}

const NotFound = ({ 
  message,
  buttonText,
  title,
  description,
  href,
  buttonFn
}: NotFoundProps) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="text-center space-y-5">
        <h1 className="text-9xl font-bold text-primary">{title}</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            {message}
          </h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        {buttonText && buttonFn ? (
          <button
            onClick={buttonFn}
            className={cn(
              buttonVariants({ variant: "default" }),
              "mt-4"
            )}
          >
            {buttonText}
          </button>
        ) : buttonText && href && (
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "default" }),
              "mt-4"
            )}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  )
}

export default NotFound