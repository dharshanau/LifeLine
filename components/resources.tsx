"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Video, Headphones, Search, Clock, Star, ExternalLink, Play, Lightbulb } from "lucide-react"
import { toast } from "sonner"

const resources = [
  {
    id: 1,
    title: "Understanding Anxiety: A Complete Guide",
    type: "article",
    category: "anxiety",
    duration: "8 min read",
    rating: 4.8,
    description: "Learn about anxiety symptoms, causes, and evidence-based coping strategies.",
    externalUrl: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
    content: {
      intro:
        "Anxiety is a natural human emotion that everyone experiences from time to time. However, when anxiety becomes persistent, excessive, or interferes with daily life, it may indicate an anxiety disorder.",
      sections: [
        {
          title: "What is Anxiety?",
          content:
            "Anxiety is your body's natural response to stress. It's a feeling of fear or apprehension about what's to come.",
          highlights: ["Racing heart", "Sweating", "Trembling", "Difficulty concentrating", "Restlessness"],
        },
        {
          title: "Types of Anxiety Disorders",
          content: "There are several different types of anxiety disorders, each with unique characteristics:",
          highlights: [
            "Generalized Anxiety Disorder (GAD): Persistent worry about various aspects of life",
            "Panic Disorder: Recurring panic attacks",
            "Social Anxiety Disorder: Fear of social situations",
            "Specific Phobias: Intense fear of specific objects or situations",
          ],
        },
        {
          title: "Coping Strategies",
          content: "Evidence-based techniques that can help manage anxiety:",
          highlights: [
            "Deep breathing exercises and 4-7-8 breathing technique",
            "Mindfulness meditation and body scan practices",
            "Regular exercise and adequate sleep",
            "Balanced nutrition and limiting caffeine",
          ],
        },
      ],
      keyTakeaway:
        "Remember, seeking help is a sign of strength, not weakness. If anxiety interferes with daily activities, causes significant distress, or includes physical symptoms, consider professional support.",
    },
    url: "#",
  },
  {
    id: 2,
    title: "Mindfulness Meditation for Beginners",
    type: "video",
    category: "mindfulness",
    duration: "15 min",
    rating: 4.9,
    description: "A guided introduction to mindfulness meditation techniques.",
    externalUrl: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    content: {
      intro:
        "Welcome to this guided mindfulness meditation session. This video will help you learn the basics of mindfulness practice and develop a sustainable meditation routine.",
      sections: [
        {
          title: "What You'll Learn",
          content: "This comprehensive guide covers everything you need to start your mindfulness journey:",
          highlights: [
            "Basic mindfulness principles and philosophy",
            "Breathing awareness techniques",
            "Body scan meditation practices",
            "How to deal with wandering thoughts",
          ],
        },
        {
          title: "Getting Started",
          content: "Simple steps to begin your practice:",
          highlights: [
            "Find a comfortable position with your back straight but not rigid",
            "Close your eyes or soften your gaze downward",
            "Focus on your breath and notice its natural rhythm",
          ],
        },
        {
          title: "The 15-Minute Practice",
          content: "A structured meditation session broken into three parts:",
          highlights: [
            "Breath Awareness (5 minutes): Simply observe your breath without changing it",
            "Body Scan (5 minutes): Move attention through your body, noticing sensations",
            "Open Awareness (5 minutes): Expand awareness to include sounds and thoughts",
          ],
        },
      ],
      keyTakeaway:
        "There's no 'perfect' meditation. The practice is about noticing when your mind wanders and gently returning to the present moment. Start with 5-10 minutes daily and be patient with yourself.",
    },
    url: "#",
  },
  {
    id: 3,
    title: "Sleep Better: Improving Mental Health Through Rest",
    type: "podcast",
    category: "sleep",
    duration: "32 min",
    rating: 4.7,
    description: "Expert insights on the connection between sleep and mental wellness.",
    externalUrl: "https://www.youtube.com/watch?v=nm1TxQj9IsQ",
    content: {
      intro:
        "In this episode, we explore the crucial relationship between sleep and mental health with sleep specialist Dr. Sarah Johnson. Discover how quality sleep can transform your emotional well-being.",
      sections: [
        {
          title: "The Sleep-Mental Health Connection",
          content: "Understanding how sleep directly impacts your mental state:",
          highlights: [
            "How sleep affects mood regulation and emotional processing",
            "The role of REM sleep in memory consolidation",
            "Connection between sleep disorders and mental health conditions",
            "Why sleep deprivation increases anxiety and depression risk",
          ],
        },
        {
          title: "Common Sleep Challenges",
          content: "Identifying and addressing sleep issues that affect mental health:",
          highlights: [
            "Insomnia and anxiety: Breaking the cycle",
            "Depression and oversleeping patterns",
            "Stress-related sleep disruption",
            "Technology's impact on sleep quality",
          ],
        },
        {
          title: "Evidence-Based Sleep Strategies",
          content: "Practical techniques for better sleep and mental health:",
          highlights: [
            "Sleep hygiene basics: consistent schedule, cool environment",
            "Pre-sleep routine: wind down 1 hour before bed",
            "Daytime habits: morning sunlight, exercise timing",
            "When to seek professional help for sleep issues",
          ],
        },
      ],
      keyTakeaway:
        "Sleep is not a luxury—it's a necessity for mental health. Quality sleep helps regulate emotions, consolidate memories, and restore the brain. Investing in better sleep is investing in your mental well-being.",
    },
    url: "#",
  },
  {
    id: 4,
    title: "Cognitive Behavioral Therapy Techniques",
    type: "article",
    category: "therapy",
    duration: "12 min read",
    rating: 4.6,
    description: "Learn CBT techniques you can practice on your own.",
    externalUrl: "https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral",
    content: {
      intro:
        "Cognitive Behavioral Therapy (CBT) is one of the most effective forms of therapy for anxiety, depression, and many other mental health conditions. These techniques can be practiced independently to improve your mental well-being.",
      sections: [
        {
          title: "Understanding CBT",
          content: "CBT is based on the idea that our thoughts, feelings, and behaviors are interconnected:",
          highlights: [
            "Thoughts influence emotions and behaviors",
            "Changing negative thought patterns improves emotions",
            "Behavioral changes can shift thinking patterns",
            "The goal is to develop healthier coping strategies",
          ],
        },
        {
          title: "Core CBT Techniques",
          content: "Practical tools you can use daily:",
          highlights: [
            "Thought Records: Track situations, emotions, thoughts, and evidence",
            "Cognitive Restructuring: Challenge and reframe negative thoughts",
            "Behavioral Experiments: Test assumptions through real-world experiences",
            "Activity Scheduling: Plan meaningful and pleasant activities",
          ],
        },
        {
          title: "Common Cognitive Distortions",
          content: "Recognizing unhelpful thinking patterns:",
          highlights: [
            "All-or-Nothing Thinking: Seeing things in black and white",
            "Catastrophizing: Expecting the worst possible outcome",
            "Mind Reading: Assuming you know what others think",
            "Emotional Reasoning: 'I feel it, so it must be true'",
          ],
        },
      ],
      keyTakeaway:
        "CBT takes practice and patience. Start with one technique at a time and be compassionate with yourself as you learn these new skills. Consider working with a therapist for personalized guidance.",
    },
    url: "#",
  },
  {
    id: 5,
    title: "Breathing Exercises for Panic Attacks",
    type: "video",
    category: "anxiety",
    duration: "8 min",
    rating: 4.9,
    description: "Quick breathing techniques to manage panic and anxiety.",
    externalUrl: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
    content: {
      intro:
        "Learn these powerful breathing techniques to help manage panic attacks and acute anxiety. These exercises can be used anywhere, anytime you need immediate relief.",
      sections: [
        {
          title: "Understanding Panic Attacks",
          content: "Recognizing the signs and symptoms:",
          highlights: [
            "Rapid heartbeat and shortness of breath",
            "Sweating and trembling",
            "Feeling of impending doom or loss of control",
            "Physical symptoms that feel overwhelming but are not dangerous",
          ],
        },
        {
          title: "Emergency Breathing Techniques",
          content: "Three powerful techniques for immediate relief:",
          highlights: [
            "Box Breathing (4-4-4-4): Inhale 4, hold 4, exhale 4, hold 4",
            "4-7-8 Breathing: Inhale 4, hold 7, exhale 8 counts",
            "Belly Breathing: Focus on expanding your diaphragm, not chest",
          ],
        },
        {
          title: "During a Panic Attack",
          content: "Step-by-step guidance for managing panic:",
          highlights: [
            "Find a safe space to sit or stand",
            "Choose one breathing technique and focus on it",
            "Use 5-4-3-2-1 grounding: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste",
            "Remind yourself that panic attacks are temporary",
          ],
        },
      ],
      keyTakeaway:
        "Panic attacks are temporary and not dangerous, even though they feel overwhelming. Regular practice of these breathing techniques when you're calm will make them more effective during panic episodes.",
    },
    url: "#",
  },
  {
    id: 6,
    title: "Building Resilience in Difficult Times",
    type: "podcast",
    category: "resilience",
    duration: "28 min",
    rating: 4.5,
    description: "Strategies for developing emotional resilience and coping skills.",
    externalUrl: "https://podcasts.apple.com/us/podcast/ten-percent-happier-with-dan-harris/id1087147821",
    content: {
      intro:
        "Join resilience expert Dr. Maria Rodriguez as she shares evidence-based strategies for building emotional resilience during challenging periods. Learn how to bounce back stronger from life's difficulties.",
      sections: [
        {
          title: "What is Resilience?",
          content: "Understanding the core components of emotional resilience:",
          highlights: [
            "The ability to bounce back from adversity",
            "Adapting to change and stress effectively",
            "Growing stronger through challenges",
            "Maintaining hope during difficult times",
          ],
        },
        {
          title: "The RISE Framework",
          content: "A practical approach to building resilience:",
          highlights: [
            "Relationships: Cultivate supportive connections and practice vulnerability",
            "Inner Strength: Develop self-awareness and practice self-compassion",
            "Sense of Purpose: Identify values and connect to something larger",
            "Emotional Regulation: Learn to name emotions and develop coping strategies",
          ],
        },
        {
          title: "Daily Resilience Practices",
          content: "Simple habits that build resilience over time:",
          highlights: [
            "Morning intention setting and gratitude journaling",
            "Mindfulness meditation and physical exercise",
            "Learning from setbacks and building diverse coping strategies",
            "Focusing on what you can control during crisis",
          ],
        },
      ],
      keyTakeaway:
        "Resilience is a skill that can be learned at any age. Small daily practices compound over time, and seeking help actually builds resilience rather than weakening it. Be patient and compassionate with yourself on this journey.",
    },
    url: "#",
  },
]

const categories = ["all", "anxiety", "depression", "mindfulness", "therapy", "sleep", "resilience"]

const typeIcons = {
  article: BookOpen,
  video: Video,
  podcast: Headphones,
}

const typeColors = {
  article: "bg-blue-100 text-blue-800",
  video: "bg-red-100 text-red-800",
  podcast: "bg-green-100 text-green-800",
}

export function Resources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedResource, setSelectedResource] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleViewResource = (resource: any) => {
    setSelectedResource(resource)
    setIsDialogOpen(true)
    toast.success(`Opening: ${resource.title}`)
  }

  const handleExternalLink = (resource: any) => {
    const resourceTypeText = {
      video: "YouTube video",
      article: "article",
      podcast: "podcast episode",
    }

    toast.success(`Opening ${resourceTypeText[resource.type as keyof typeof resourceTypeText]}: ${resource.title}`)

    // Open the actual external URL
    window.open(resource.externalUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Mental Health Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Curated articles, videos, and podcasts to support your mental health journey. Click "Open External Link" to
            access the full content.
          </p>

          {/* Search */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const IconComponent = typeIcons[resource.type as keyof typeof typeIcons]

          return (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge className={typeColors[resource.type as keyof typeof typeColors]}>
                    <IconComponent className="w-3 h-3 mr-1" />
                    {resource.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {resource.rating}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {resource.duration}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleViewResource(resource)} className="flex-1">
                    {resource.type === "video" ? (
                      <>
                        <Play className="w-3 h-3 mr-1" />
                        Preview
                      </>
                    ) : (
                      "View Summary"
                    )}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleExternalLink(resource)}>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No resources found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Resource Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              {selectedResource && (
                <>
                  {typeIcons[selectedResource.type as keyof typeof typeIcons] &&
                    (() => {
                      const IconComponent = typeIcons[selectedResource.type as keyof typeof typeIcons]
                      return <IconComponent className="w-6 h-6 text-blue-600" />
                    })()}
                  <span className="text-gray-800">{selectedResource.title}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedResource && (
            <div className="space-y-6">
              {/* Resource Info */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <Badge className={`${typeColors[selectedResource.type as keyof typeof typeColors]} text-sm px-3 py-1`}>
                  {selectedResource.type}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{selectedResource.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{selectedResource.rating}</span>
                </div>
              </div>

              {/* Introduction */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-blue-800 leading-relaxed">{selectedResource.content.intro}</p>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {selectedResource.content.sections.map((section: any, index: number) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                    </div>

                    <p className="text-gray-700 ml-10 mb-3">{section.content}</p>

                    <div className="ml-10 space-y-2">
                      {section.highlights.map((highlight: string, highlightIndex: number) => (
                        <div key={highlightIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Key Takeaway */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Key Takeaway</h4>
                </div>
                <p className="text-green-700 leading-relaxed">{selectedResource.content.keyTakeaway}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => handleExternalLink(selectedResource)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {selectedResource.type === "video" && "Watch Full Video"}
                  {selectedResource.type === "article" && "Read Complete Article"}
                  {selectedResource.type === "podcast" && "Listen to Full Episode"}
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="px-6">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
