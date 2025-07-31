"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTRPC } from "@/trpc/client"

export default function Home() {
  const [value, setValue] = useState("")
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
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        onClick={() => invoke.mutate({ value: value })}
        disabled={invoke.isPending}
      >
        Invoke background job
      </Button>
    </div>
  )
}
