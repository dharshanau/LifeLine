"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, MessageCircle, Heart, Shield, Clock, Users } from "lucide-react"

export function CrisisSupport() {
  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support",
      type: "call",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 text-based crisis support",
      type: "text",
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse support",
      type: "call",
    },
  ]

  const copingStrategies = [
    {
      title: "5-4-3-2-1 Grounding Technique",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
      icon: Shield,
    },
    {
      title: "Box Breathing",
      description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
      icon: Heart,
    },
    {
      title: "Safe Space Visualization",
      description: "Close your eyes and imagine a place where you feel completely safe and calm",
      icon: Users,
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Alert className="border-red-200 bg-red-50">
        <Heart className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>You are not alone.</strong> If you're having thoughts of self-harm or suicide, please reach out for
          help immediately. These resources are available 24/7.
        </AlertDescription>
      </Alert>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Phone className="w-5 h-5" />
            Emergency Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-red-800">{contact.name}</h3>
                    <p className="text-red-600 text-sm">{contact.description}</p>
                  </div>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      if (contact.type === "call") {
                        window.open(`tel:${contact.number.replace(/\D/g, "")}`)
                      }
                    }}
                  >
                    {contact.type === "call" ? (
                      <>
                        <Phone className="w-4 h-4 mr-2" />
                        {contact.number}
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Text
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Immediate Coping Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Immediate Coping Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {copingStrategies.map((strategy, index) => {
              const IconComponent = strategy.icon
              return (
                <div key={index} className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start gap-3">
                    <IconComponent className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-1">{strategy.title}</h3>
                      <p className="text-blue-700">{strategy.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Professional Help */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            Professional Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="font-semibold mb-1">Find a Therapist</div>
              <div className="text-sm text-gray-600">Connect with licensed mental health professionals</div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="font-semibold mb-1">Support Groups</div>
              <div className="text-sm text-gray-600">Join peer support communities</div>
            </Button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Remember:</h3>
            <ul className="text-green-700 space-y-1 text-sm">
              <li>• Seeking help is a sign of strength, not weakness</li>
              <li>• Your feelings are valid and temporary</li>
              <li>• Recovery is possible with the right support</li>
              <li>• You deserve care and compassion</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
