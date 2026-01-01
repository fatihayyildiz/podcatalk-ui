import { cn } from "../../utils/shadcn-utils"
import type * as React from "react"
import { StickToBottom, type StickToBottomProps } from "use-stick-to-bottom"

const StickToBottomRoot =
  StickToBottom as unknown as React.ComponentType<StickToBottomProps>
const StickToBottomContent =
  StickToBottom.Content as unknown as React.ComponentType<
    React.HTMLAttributes<HTMLDivElement> & {
      children: React.ReactNode | ((context: unknown) => React.ReactNode)
    }
  >

export type ChatContainerRootProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export type ChatContainerContentProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export type ChatContainerScrollAnchorProps = {
  className?: string
  ref?: React.RefObject<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>

function ChatContainerRoot({
  children,
  className,
  ...props
}: ChatContainerRootProps) {
  return (
    <StickToBottomRoot
      className={cn("flex overflow-y-auto", className)}
      resize="smooth"
      initial
      role="log"
      {...props}
    >
      {children}
    </StickToBottomRoot>
  )
}

function ChatContainerContent({
  children,
  className,
  ...props
}: ChatContainerContentProps) {
  return (
    <StickToBottomContent
      className={cn("flex w-full flex-col", className)}
      {...props}
    >
      {children}
    </StickToBottomContent>
  )
}

function ChatContainerScrollAnchor({
  className,
  ...props
}: ChatContainerScrollAnchorProps) {
  return (
    <div
      className={cn("h-px w-full shrink-0 scroll-mt-4", className)}
      aria-hidden="true"
      {...props}
    />
  )
}

export { ChatContainerRoot, ChatContainerContent, ChatContainerScrollAnchor }
