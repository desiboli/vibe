import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { getQueryClient, trpc } from "@/trpc/server"
import { ClientGreeting } from "./client-greeting"

export default async function Home() {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.createAI.queryOptions({
      text: "Taffo!",
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>Hello World!</div>
        <ClientGreeting />
      </Suspense>
    </HydrationBoundary>
  )
}
