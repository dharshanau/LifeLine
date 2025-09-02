import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// Fallback responses based on mood
const getFallbackResponse = (mood: number, description: string) => {
  const responses = {
    1: "I hear that you're going through a really difficult time right now. Your feelings are completely valid, and it's okay to not be okay. Here are some gentle strategies that might help: Try the 5-4-3-2-1 grounding technique (name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste). Consider reaching out to a trusted friend or counselor. Remember, this feeling is temporary, and you deserve support and care.",
    2: "I can sense you're feeling down today, and I want you to know that's completely understandable. Sometimes we all have difficult days. Here are some caring suggestions: Try some gentle movement like stretching or a short walk. Practice self-compassion - speak to yourself as you would a good friend. Consider doing one small thing that usually brings you comfort. You're stronger than you know, and tomorrow is a new opportunity.",
    3: "It sounds like you're in a neutral space today, which is perfectly okay. Sometimes we need these balanced moments. Here are some ways to nurture yourself: Try a brief mindfulness exercise or meditation. Set one small, achievable goal for today. Take a moment to appreciate something in your environment. Remember that every day doesn't have to be amazing - steady and calm has its own value.",
    4: "I'm glad to hear you're feeling good today! It's wonderful when we can appreciate these positive moments. Here are ways to build on this feeling: Practice gratitude by noting what's contributing to your good mood. Share your positive energy with someone you care about. Engage in an activity that brings you joy. Remember this feeling for times when you need a reminder of your resilience.",
    5: "It's beautiful to hear that you're feeling great today! These moments of joy and contentment are so important to celebrate. Here are ways to embrace this positive energy: Take time to really savor this feeling and what created it. Consider doing something creative or adventurous. Share your happiness with others - positive emotions are contagious! Store this memory as a reminder of your capacity for joy and growth.",
  }

  return responses[mood as keyof typeof responses] || responses[3]
}

export async function POST(req: Request) {
  try {
    const { mood, description, previousMoods } = await req.json()

    // Check if OpenAI API key is available and valid
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey || apiKey === "happy" || apiKey.length < 10) {
      console.log("OpenAI API key not available, using fallback response")

      // Simple crisis detection based on keywords
      const crisisKeywords = ["suicide", "kill myself", "end it all", "no point", "hopeless", "can't go on"]
      const isCrisis = crisisKeywords.some((keyword) => description?.toLowerCase().includes(keyword))

      return Response.json({
        response: getFallbackResponse(mood, description),
        isCrisis,
        timestamp: new Date().toISOString(),
      })
    }

    try {
      const { text } = await generateText({
        model: openai("gpt-4"),
        system: `You are a compassionate mental health AI assistant. Analyze the user's mood and provide supportive, empathetic responses with practical coping strategies. Always be encouraging and never provide medical advice. If you detect signs of severe distress or crisis, recommend professional help.`,
        prompt: `User's current mood: ${mood}
        Description: ${description}
        Recent mood pattern: ${previousMoods?.join(", ") || "No previous data"}
        
        Please provide:
        1. An empathetic response acknowledging their feelings
        2. 2-3 practical coping strategies
        3. A gentle encouragement
        4. If concerning patterns detected, suggest professional support`,
      })

      // Simple crisis detection based on keywords
      const crisisKeywords = ["suicide", "kill myself", "end it all", "no point", "hopeless", "can't go on"]
      const isCrisis = crisisKeywords.some((keyword) => description?.toLowerCase().includes(keyword))

      return Response.json({
        response: text,
        isCrisis,
        timestamp: new Date().toISOString(),
      })
    } catch (aiError) {
      console.log("AI generation failed, using fallback response:", aiError)

      // Simple crisis detection based on keywords
      const crisisKeywords = ["suicide", "kill myself", "end it all", "no point", "hopeless", "can't go on"]
      const isCrisis = crisisKeywords.some((keyword) => description?.toLowerCase().includes(keyword))

      return Response.json({
        response: getFallbackResponse(mood, description),
        isCrisis,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Error analyzing mood:", error)
    return Response.json({
      response:
        "I'm here to support you. While I'm having technical difficulties right now, please know that your feelings matter and there are always people ready to help.",
      isCrisis: false,
      timestamp: new Date().toISOString(),
    })
  }
}
