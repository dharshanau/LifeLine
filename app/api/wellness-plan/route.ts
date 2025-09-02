import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const wellnessPlanSchema = z.object({
  activities: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      duration: z.string(),
      category: z.enum(["mindfulness", "exercise", "social", "creative", "self-care"]),
    }),
  ),
  goals: z.array(z.string()),
  affirmation: z.string(),
})

// Fallback wellness plan data
const getFallbackPlan = () => ({
  activities: [
    {
      title: "Morning Mindfulness",
      description: "Start your day with 5 minutes of deep breathing and intention setting",
      duration: "5 minutes",
      category: "mindfulness" as const,
    },
    {
      title: "Gentle Walk",
      description: "Take a peaceful walk outside, focusing on your surroundings",
      duration: "15 minutes",
      category: "exercise" as const,
    },
    {
      title: "Gratitude Journaling",
      description: "Write down three things you're grateful for today",
      duration: "10 minutes",
      category: "self-care" as const,
    },
    {
      title: "Creative Expression",
      description: "Spend time on a creative activity that brings you joy",
      duration: "20 minutes",
      category: "creative" as const,
    },
    {
      title: "Connect with Someone",
      description: "Reach out to a friend or family member for a meaningful conversation",
      duration: "15 minutes",
      category: "social" as const,
    },
  ],
  goals: [
    "Practice mindfulness daily",
    "Maintain regular physical activity",
    "Cultivate gratitude and positive thinking",
  ],
  affirmation: "I am capable of growth, resilience, and positive change in my life.",
})

// Generate varied fallback plans
const getVariedFallbackPlan = () => {
  const plans = [
    {
      activities: [
        {
          title: "Deep Breathing Exercise",
          description: "Practice 4-7-8 breathing technique to reduce stress and anxiety",
          duration: "10 minutes",
          category: "mindfulness" as const,
        },
        {
          title: "Nature Connection",
          description: "Spend time outdoors, whether in a garden, park, or just by a window",
          duration: "20 minutes",
          category: "exercise" as const,
        },
        {
          title: "Self-Compassion Practice",
          description: "Write yourself a kind letter or practice positive self-talk",
          duration: "15 minutes",
          category: "self-care" as const,
        },
        {
          title: "Art Therapy",
          description: "Draw, paint, or create something without judgment",
          duration: "25 minutes",
          category: "creative" as const,
        },
        {
          title: "Virtual Coffee Date",
          description: "Schedule a video call with someone who makes you smile",
          duration: "30 minutes",
          category: "social" as const,
        },
      ],
      goals: [
        "Reduce daily stress through breathing exercises",
        "Strengthen social connections",
        "Express creativity without judgment",
      ],
      affirmation: "I deserve peace, joy, and meaningful connections in my life.",
    },
    {
      activities: [
        {
          title: "Body Scan Meditation",
          description: "Progressive relaxation focusing on each part of your body",
          duration: "12 minutes",
          category: "mindfulness" as const,
        },
        {
          title: "Yoga Flow",
          description: "Gentle stretching and movement to connect mind and body",
          duration: "20 minutes",
          category: "exercise" as const,
        },
        {
          title: "Digital Detox Hour",
          description: "Take a break from screens and enjoy analog activities",
          duration: "60 minutes",
          category: "self-care" as const,
        },
        {
          title: "Music Therapy",
          description: "Listen to calming music or create your own sounds",
          duration: "15 minutes",
          category: "creative" as const,
        },
        {
          title: "Community Service",
          description: "Do something kind for others, even if it's small",
          duration: "30 minutes",
          category: "social" as const,
        },
      ],
      goals: [
        "Improve mind-body connection",
        "Reduce screen time for better mental health",
        "Find joy in helping others",
      ],
      affirmation: "I am present, grounded, and capable of making a positive difference.",
    },
    {
      activities: [
        {
          title: "Loving-Kindness Meditation",
          description: "Send compassionate thoughts to yourself and others",
          duration: "8 minutes",
          category: "mindfulness" as const,
        },
        {
          title: "Dance Movement",
          description: "Move your body freely to music that makes you feel good",
          duration: "15 minutes",
          category: "exercise" as const,
        },
        {
          title: "Comfort Ritual",
          description: "Create a soothing routine like tea time or a warm bath",
          duration: "25 minutes",
          category: "self-care" as const,
        },
        {
          title: "Story Writing",
          description: "Write a short story, poem, or journal entry",
          duration: "20 minutes",
          category: "creative" as const,
        },
        {
          title: "Active Listening",
          description: "Have a meaningful conversation where you truly listen",
          duration: "20 minutes",
          category: "social" as const,
        },
      ],
      goals: [
        "Cultivate self-compassion and empathy",
        "Express emotions through movement",
        "Strengthen communication skills",
      ],
      affirmation: "I am worthy of love, understanding, and gentle care.",
    },
  ]

  return plans[Math.floor(Math.random() * plans.length)]
}

export async function POST(req: Request) {
  try {
    const { moods, preferences, goals } = await req.json()

    // Check if OpenAI API key is available and valid
    const apiKey = process.env.OPENAI_API_KEY

    console.log("API Key status:", {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      firstChars: apiKey?.substring(0, 10) || "none",
      isValid: apiKey && apiKey.length > 20 && apiKey.startsWith("sk-"),
    })

    if (!apiKey || apiKey === "happy" || apiKey.length < 20 || !apiKey.startsWith("sk-")) {
      console.log("Using fallback plan - API key invalid or missing")
      return Response.json(getVariedFallbackPlan())
    }

    try {
      console.log("Attempting AI generation...")
      const { object } = await generateObject({
        model: openai("gpt-4"),
        schema: wellnessPlanSchema,
        prompt: `Create a personalized wellness plan based on:
        Recent moods: ${moods?.join(", ") || "Mixed"}
        User preferences: ${preferences || "General wellness"}
        Goals: ${goals || "Improve mental well-being"}
        
        Generate 5 diverse activities across different categories (mindfulness, exercise, social, creative, self-care), 3 achievable goals, and 1 positive affirmation. Make the activities specific and actionable.`,
      })

      console.log("AI generation successful")
      return Response.json(object)
    } catch (aiError) {
      console.log("AI generation failed:", aiError)
      return Response.json(getVariedFallbackPlan())
    }
  } catch (error) {
    console.error("Error in wellness plan API:", error)
    return Response.json(getVariedFallbackPlan())
  }
}
