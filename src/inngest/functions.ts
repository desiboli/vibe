import { createAgent, openai } from "@inngest/agent-kit"

import { inngest } from "./client"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      description: "An expert coder which can write and debug code.",
      system:
        "You are an expert Next.js developer. You write readable, maintainable code. You write simple Next.js & React snippets.",
      model: openai({
        model: "gpt-4o",
      }),
    })

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    )

    console.log(output)

    // Imagine this is a summary step
    return { success: "ok!" }
  }
)
