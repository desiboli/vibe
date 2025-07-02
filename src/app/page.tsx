"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"

export default function Home() {
  const trpc = useTRPC()
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background job invoked")
      },
    })
  )

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Button
        onClick={() => invoke.mutate({ text: "Taffo!" })}
        disabled={invoke.isPending}
      >
        Invoke background job
      </Button>
    </div>
  )
}
