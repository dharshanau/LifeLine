"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Users, MessageCircle, Heart, Plus, Clock, Shield, Loader2 } from "lucide-react"
import { toast } from "sonner"

const supportGroups = [
  {
    id: 1,
    name: "Anxiety Support",
    members: 1247,
    description: "A safe space to share experiences and coping strategies for anxiety",
    category: "anxiety",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    name: "College Stress",
    members: 892,
    description: "Support for students dealing with academic and social pressures",
    category: "student",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 3,
    name: "Grief & Loss",
    members: 634,
    description: "Compassionate community for those processing loss and grief",
    category: "grief",
    color: "bg-gray-100 text-gray-800",
  },
  {
    id: 4,
    name: "Depression Warriors",
    members: 1456,
    description: "Fighting depression together with understanding and hope",
    category: "depression",
    color: "bg-green-100 text-green-800",
  },
]

const initialPosts = [
  {
    id: 1,
    author: "Anonymous User",
    group: "Anxiety Support",
    content:
      "Had my first panic attack in months today. Feeling discouraged but trying to remember that setbacks are part of recovery.",
    replies: 12,
    hearts: 24,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    author: "Anonymous User",
    group: "College Stress",
    content: "Finals week is approaching and I'm feeling overwhelmed. Any study tips that help with anxiety?",
    replies: 8,
    hearts: 15,
    timeAgo: "4 hours ago",
  },
  {
    id: 3,
    author: "Anonymous User",
    group: "Depression Warriors",
    content: "Small win today - I made my bed and took a shower. Sometimes the little things feel huge.",
    replies: 18,
    hearts: 47,
    timeAgo: "6 hours ago",
  },
]

export function Community() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [newPost, setNewPost] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [posts, setPosts] = useState(initialPosts)

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    setIsPosting(true)

    // Simulate API call with timeout
    setTimeout(() => {
      const selectedGroupData = selectedGroup
        ? supportGroups.find((group) => group.id === selectedGroup)
        : supportGroups[0]

      const newPostData = {
        id: Date.now(),
        author: "Anonymous User",
        group: selectedGroupData?.name || "General Discussion",
        content: newPost,
        replies: 0,
        hearts: 0,
        timeAgo: "Just now",
      }

      setPosts([newPostData, ...posts])
      setNewPost("")
      setIsPosting(false)
      toast.success("Post shared anonymously")
    }, 1000)
  }

  const handleHeartClick = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, hearts: post.hearts + 1 }
        }
        return post
      }),
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Community Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Shield className="w-5 h-5" />
            Community Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-blue-700 text-sm space-y-1">
            <p>• Be kind, respectful, and supportive to all members</p>
            <p>• Share experiences, not medical advice</p>
            <p>• Maintain anonymity - no personal information</p>
            <p>• Report concerning content to moderators</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Support Groups */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Support Groups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {supportGroups.map((group) => (
                <div
                  key={group.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedGroup === group.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{group.name}</h3>
                    <Badge className={group.color}>{group.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{group.members.toLocaleString()} members</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-500" />
                Share with the Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your thoughts, experiences, or ask for support... (Anonymous posting)"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  {selectedGroup
                    ? `Posting to: ${supportGroups.find((g) => g.id === selectedGroup)?.name}`
                    : "Select a group or post to General Discussion"}
                </p>
                <Button disabled={!newPost.trim() || isPosting} onClick={handlePostSubmit}>
                  {isPosting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post Anonymously"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-500" />
                Recent Community Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{post.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {post.group}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {post.timeAgo}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{post.content}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button
                      className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      onClick={() => handleHeartClick(post.id)}
                    >
                      <Heart className="w-4 h-4" />
                      {post.hearts}
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {post.replies} replies
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
