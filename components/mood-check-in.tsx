"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, Brain, AlertTriangle, Loader2 } from "lucide-react"

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "bg-red-100 text-red-800" },
  { emoji: "😔", label: "Sad", value: 2, color: "bg-orange-100 text-orange-800" },
  { emoji: "😐", label: "Neutral", value: 3, color: "bg-gray-100 text-gray-800" },
  { emoji: "🙂", label: "Good", value: 4, color: "bg-blue-100 text-blue-800" },
  { emoji: "😊", label: "Great", value: 5, color: "bg-green-100 text-green-800" },
]

interface MoodCheckInProps {
  onMoodSubmit: (mood: any) => void
}

export function MoodCheckIn({ onMoodSubmit }: MoodCheckInProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [isCrisis, setIsCrisis] = useState(false)

  const handleSubmit = async () => {
    if (!selectedMood) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/mood-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selectedMood,
          description,
          previousMoods: [], // Would come from stored data
        }),
      })

      const data = await response.json()
      setAiResponse(data.response)
      setIsCrisis(data.isCrisis)

      onMoodSubmit({
        mood: selectedMood,
        description,
        timestamp: new Date().toISOString(),
        aiResponse: data.response,
        isCrisis: data.isCrisis,
      })
    } catch (error) {
      console.error("Error submitting mood:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (aiResponse) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isCrisis ? (
              <>
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">Immediate Support Available</span>
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-green-700">AI Companion Response</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isCrisis && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Crisis Support</h3>
              <p className="text-red-700 mb-3">You're not alone. Help is available 24/7.</p>
              <div className="space-y-2">
                <Button className="w-full bg-red-600 hover:bg-red-700">Call Crisis Hotline: 988</Button>
                <Button variant="outline" className="w-full">
                  Chat with Crisis Counselor
                </Button>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Your AI Companion</span>
            </div>
            <p className="text-blue-700 whitespace-pre-wrap">{aiResponse}</p>
          </div>

          <Button
            onClick={() => {
              setAiResponse(null)
              setSelectedMood(null)
              setDescription("")
              setIsCrisis(false)
            }}
            variant="outline"
            className="w-full"
          >
            New Check-in
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          Daily Mood Check-in
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">How are you feeling today?</h3>
          <div className="grid grid-cols-5 gap-3">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMood === mood.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <Badge className={mood.color}>{mood.label}</Badge>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Tell me more (optional)</h3>
          <Textarea
            placeholder="What's on your mind? Share as much or as little as you'd like..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button onClick={handleSubmit} disabled={!selectedMood || isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Getting AI Support...
            </>
          ) : (
            "Submit Check-in"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
