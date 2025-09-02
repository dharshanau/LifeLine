"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoodCheckIn } from "../components/mood-check-in"
import { WellnessPlan } from "../components/wellness-plan"
import { CrisisSupport } from "../components/crisis-support"
import { Community } from "../components/community"
import { Resources } from "../components/resources"
import {
  Heart,
  Target,
  AlertTriangle,
  Users,
  BookOpen,
  Settings,
  Menu,
  X,
  Plus,
  Trash2,
  Phone,
  Mail,
} from "lucide-react"
import { Toaster, toast } from "sonner"

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: Heart },
  { id: "wellness", label: "Wellness Plan", icon: Target },
  { id: "crisis", label: "Crisis Support", icon: AlertTriangle },
  { id: "community", label: "Community", icon: Users },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings },
]

interface TrustedContact {
  id: number
  name: string
  relationship: string
  phone: string
  email: string
}

export default function LifeLineApp() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [recentMoods, setRecentMoods] = useState<any[]>([])
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>([])
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
  })

  const handleMoodSubmit = (moodData: any) => {
    setRecentMoods((prev) => [moodData, ...prev.slice(0, 6)])
  }

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Please fill in at least name and phone number")
      return
    }

    const contact: TrustedContact = {
      id: Date.now(),
      ...newContact,
    }

    setTrustedContacts((prev) => [...prev, contact])
    setNewContact({ name: "", relationship: "", phone: "", email: "" })
    setIsAddContactOpen(false)
    toast.success(`Added ${newContact.name} as a trusted contact`)
  }

  const handleRemoveContact = (id: number) => {
    const contact = trustedContacts.find((c) => c.id === id)
    setTrustedContacts((prev) => prev.filter((c) => c.id !== id))
    toast.success(`Removed ${contact?.name} from trusted contacts`)
  }

  const handleCallContact = (phone: string, name: string) => {
    toast.info(`Calling ${name} at ${phone}`)
    // In a real app, this would initiate a phone call
    window.open(`tel:${phone}`)
  }

  const handleEmailContact = (email: string, name: string) => {
    if (!email) {
      toast.error("No email address available")
      return
    }
    toast.info(`Opening email to ${name}`)
    window.open(`mailto:${email}?subject=Checking in&body=Hi ${name}, I wanted to reach out...`)
  }

  const handleDataExport = () => {
    const data = {
      trustedContacts,
      recentMoods,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lifeline-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Data exported successfully")
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to LifeLine</h1>
              <p className="text-gray-600">Your AI-powered mental health companion</p>
            </div>

            <MoodCheckIn onMoodSubmit={handleMoodSubmit} />

            {recentMoods.length > 0 && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Recent Check-ins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentMoods.slice(0, 3).map((mood, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {mood.mood === 1
                                ? "😢"
                                : mood.mood === 2
                                  ? "😔"
                                  : mood.mood === 3
                                    ? "😐"
                                    : mood.mood === 4
                                      ? "🙂"
                                      : "😊"}
                            </span>
                            <span className="font-medium">
                              {mood.mood === 1
                                ? "Very Sad"
                                : mood.mood === 2
                                  ? "Sad"
                                  : mood.mood === 3
                                    ? "Neutral"
                                    : mood.mood === 4
                                      ? "Good"
                                      : "Great"}
                            </span>
                          </div>
                          {mood.description && (
                            <p className="text-sm text-gray-600 mt-1">{mood.description.slice(0, 100)}...</p>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{new Date(mood.timestamp).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )
      case "wellness":
        return <WellnessPlan key={`wellness-plan-${Date.now()}`} />
      case "crisis":
        return <CrisisSupport />
      case "community":
        return <Community />
      case "resources":
        return <Resources />
      case "settings":
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Privacy Controls</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• All data is encrypted end-to-end</p>
                    <p>• You can delete your data at any time</p>
                    <p>• Anonymous mode available for community features</p>
                    <p>• No data shared with third parties without consent</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Emergency Contacts</h3>
                    <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Trusted Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Trusted Contact</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                              id="name"
                              value={newContact.name}
                              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                              placeholder="Enter contact name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="relationship">Relationship</Label>
                            <Select
                              value={newContact.relationship}
                              onValueChange={(value) => setNewContact({ ...newContact, relationship: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select relationship" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="family">Family Member</SelectItem>
                                <SelectItem value="friend">Friend</SelectItem>
                                <SelectItem value="partner">Partner/Spouse</SelectItem>
                                <SelectItem value="therapist">Therapist</SelectItem>
                                <SelectItem value="doctor">Doctor</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={newContact.phone}
                              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                              placeholder="Enter phone number"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email (Optional)</Label>
                            <Input
                              id="email"
                              type="email"
                              value={newContact.email}
                              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                              placeholder="Enter email address"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleAddContact} className="flex-1">
                              Add Contact
                            </Button>
                            <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {trustedContacts.length > 0 ? (
                    <div className="space-y-3">
                      {trustedContacts.map((contact) => (
                        <div key={contact.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{contact.name}</h4>
                                {contact.relationship && (
                                  <Badge variant="outline" className="text-xs">
                                    {contact.relationship}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  <span>{contact.phone}</span>
                                </div>
                                {contact.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-3 h-3" />
                                    <span>{contact.email}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCallContact(contact.phone, contact.name)}
                              >
                                <Phone className="w-3 h-3" />
                              </Button>
                              {contact.email && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEmailContact(contact.email, contact.name)}
                                >
                                  <Mail className="w-3 h-3" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveContact(contact.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No trusted contacts added yet.</p>
                      <p className="text-sm">Add someone you trust to contact during difficult times.</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Data Export</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Download all your LifeLine data including mood history and trusted contacts.
                  </p>
                  <Button onClick={handleDataExport} variant="outline" className="w-full">
                    Download My Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Toast notifications */}
      <Toaster position="top-center" />

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Heart className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">LifeLine</span>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    currentPage === item.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {item.label}
                  {item.id === "crisis" && <Badge className="ml-auto bg-red-100 text-red-800">24/7</Badge>}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6 pt-16 lg:pt-6">{renderCurrentPage()}</div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}
