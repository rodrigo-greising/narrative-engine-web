import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-violet-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-blue-violet-300",
  {
    variants: {
      variant: {
        default:
          "bg-blue-violet-600 text-blue-violet-50 shadow hover:bg-blue-violet-600/90 dark:bg-blue-violet-50 dark:text-blue-violet-900 dark:hover:bg-blue-violet-50/90",
        destructive:
          "bg-red-500 text-blue-violet-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-blue-violet-50 dark:hover:bg-red-900/90",
        outline:
          "border border-blue-violet-200 bg-white shadow-sm hover:bg-blue-violet-100 hover:text-blue-violet-900 dark:border-blue-violet-800 dark:bg-blue-violet-950 dark:hover:bg-blue-violet-800 dark:hover:text-blue-violet-50",
        secondary:
          "bg-blue-violet-100 text-blue-violet-900 shadow-sm hover:bg-blue-violet-100/80 dark:bg-blue-violet-800 dark:text-blue-violet-50 dark:hover:bg-blue-violet-800/80",
        ghost: "hover:bg-blue-violet-100 hover:text-blue-violet-900 dark:hover:bg-blue-violet-800 dark:hover:text-blue-violet-50",
        link: "text-blue-violet-900 underline-offset-4 hover:underline dark:text-blue-violet-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
