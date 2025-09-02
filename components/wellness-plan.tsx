"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, Activity, Heart, Brain, Users, Palette, Sparkles, Loader2, Info, RefreshCw } from "lucide-react"

const categoryIcons = {
  mindfulness: Brain,
  exercise: Activity,
  social: Users,
  creative: Palette,
  "self-care": Heart,
}

const categoryColors = {
  mindfulness: "bg-purple-100 text-purple-800",
  exercise: "bg-green-100 text-green-800",
  social: "bg-blue-100 text-blue-800",
  creative: "bg-orange-100 text-orange-800",
  "self-care": "bg-pink-100 text-pink-800",
}

export function WellnessPlan() {
  const [plan, setPlan] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set())

  const generatePlan = async () => {
    setIsLoading(true)
    setError(null)
    setIsUsingFallback(false)
    setCompletedActivities(new Set()) // Reset completed activities when generating new plan

    try {
      const response = await fetch("/api/wellness-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moods: ["neutral", "good"],
          preferences: "mindfulness and light exercise",
          goals: "reduce stress and improve sleep",
          timestamp: new Date().getTime(), // Add a cache-busting parameter to prevent caching
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate wellness plan")
      }

      const data = await response.json()

      // Check if this is likely a fallback response by looking for the original fallback title
      if (data.activities && data.activities[0]?.title === "Morning Mindfulness") {
        setIsUsingFallback(true)
      }

      // Ensure the data has the expected structure
      if (data && typeof data === "object") {
        setPlan({
          activities: data.activities || [],
          goals: data.goals || [],
          affirmation: data.affirmation || "You are capable of positive change.",
        })
      } else {
        throw new Error("Invalid plan data received")
      }
    } catch (error) {
      console.error("Error generating plan:", error)
      setError("Failed to generate wellness plan. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    generatePlan()
  }, [])

  const toggleActivity = (index: number) => {
    const newCompleted = new Set(completedActivities)
    if (newCompleted.has(index)) {
      newCompleted.delete(index)
    } else {
      newCompleted.add(index)
    }
    setCompletedActivities(newCompleted)
  }

  // Safe calculation of completion percentage
  const activitiesCount = plan?.activities?.length || 0
  const completionPercentage = activitiesCount > 0 ? (completedActivities.size / activitiesCount) * 100 : 0

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">Creating your personalized wellness plan...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !plan) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="text-center py-12">
          <p className="text-gray-600 mb-4">{error || "Unable to generate wellness plan"}</p>
          <Button onClick={generatePlan}>Try Again</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Fallback Notice */}
      {isUsingFallback && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>AI Personalization Unavailable:</strong> We're using curated wellness plans while our AI service is
            being configured. These evidence-based activities are still highly beneficial for your mental health
            journey. The "Generate New Plan" button will provide different curated options.
          </AlertDescription>
        </Alert>
      )}

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Today's Wellness Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Activities Completed</span>
                <span>
                  {completedActivities.size}/{activitiesCount}
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>

            {plan.affirmation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Daily Affirmation</span>
                </div>
                <p className="text-blue-700 italic">"{plan.affirmation}"</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {plan.activities && plan.activities.length > 0 ? (
              plan.activities.map((activity: any, index: number) => {
                const IconComponent = categoryIcons[activity.category as keyof typeof categoryIcons] || Activity
                const isCompleted = completedActivities.has(index)

                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 transition-all ${
                      isCompleted ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <IconComponent className="w-5 h-5 text-gray-600" />
                          <h3 className={`font-medium ${isCompleted ? "line-through text-gray-500" : ""}`}>
                            {activity.title || "Untitled Activity"}
                          </h3>
                          {activity.category && (
                            <Badge
                              className={
                                categoryColors[activity.category as keyof typeof categoryColors] ||
                                "bg-gray-100 text-gray-800"
                              }
                            >
                              {activity.category}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-gray-600 mb-2 ${isCompleted ? "line-through" : ""}`}>
                          {activity.description || "No description available"}
                        </p>
                        <p className="text-sm text-gray-500">Duration: {activity.duration || "Not specified"}</p>
                      </div>
                      <Button
                        onClick={() => toggleActivity(index)}
                        variant={isCompleted ? "default" : "outline"}
                        size="sm"
                      >
                        {isCompleted ? "Completed ✓" : "Mark Complete"}
                      </Button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No activities available</p>
                <Button onClick={generatePlan} variant="outline">
                  Generate Activities
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Your Wellness Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {plan.goals && plan.goals.length > 0 ? (
              plan.goals.map((goal: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span>{goal}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No goals set yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Button onClick={generatePlan} variant="outline" className="w-full">
        <RefreshCw className="w-4 h-4 mr-2" />
        {isUsingFallback ? "Get Different Curated Plan" : "Generate New Plan"}
      </Button>
    </div>
  )
}
