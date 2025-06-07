"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Campaign, AIAgent } from "@/lib/types"

interface CreateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (campaign: Partial<Campaign>) => void
  aiAgents: AIAgent[]
}

export function CreateCampaignModal({ isOpen, onClose, onSave, aiAgents }: CreateCampaignModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ai_agent_id: "",
    prompts: [""],
    questions: [""],
    target_contacts: [{ name: "", phone: "", email: "" }],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      prompts: formData.prompts.filter((p) => p.trim()),
      questions: formData.questions.filter((q) => q.trim()),
      target_contacts: formData.target_contacts.filter((c) => c.name || c.phone || c.email),
    })
    onClose()
  }

  const addPrompt = () => {
    setFormData((prev) => ({
      ...prev,
      prompts: [...prev.prompts, ""],
    }))
  }

  const removePrompt = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      prompts: prev.prompts.filter((_, i) => i !== index),
    }))
  }

  const updatePrompt = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      prompts: prev.prompts.map((p, i) => (i === index ? value : p)),
    }))
  }

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, ""],
    }))
  }

  const removeQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }))
  }

  const updateQuestion = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) => (i === index ? value : q)),
    }))
  }

  const addContact = () => {
    setFormData((prev) => ({
      ...prev,
      target_contacts: [...prev.target_contacts, { name: "", phone: "", email: "" }],
    }))
  }

  const removeContact = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      target_contacts: prev.target_contacts.filter((_, i) => i !== index),
    }))
  }

  const updateContact = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      target_contacts: prev.target_contacts.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Create New Campaign</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter campaign name"
                required
              />
            </div>
            <div>
              <Label htmlFor="ai_agent">AI Agent</Label>
              <Select
                value={formData.ai_agent_id}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, ai_agent_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an AI agent" />
                </SelectTrigger>
                <SelectContent>
                  {aiAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your campaign"
              rows={3}
            />
          </div>

          {/* Prompts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Prompts</Label>
              <Button type="button" variant="outline" size="sm" onClick={addPrompt}>
                <Plus className="h-4 w-4 mr-1" />
                Add Prompt
              </Button>
            </div>
            <div className="space-y-2">
              {formData.prompts.map((prompt, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={prompt}
                    onChange={(e) => updatePrompt(index, e.target.value)}
                    placeholder="Enter prompt"
                    className="flex-1"
                  />
                  {formData.prompts.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removePrompt(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Questions</Label>
              <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                <Plus className="h-4 w-4 mr-1" />
                Add Question
              </Button>
            </div>
            <div className="space-y-2">
              {formData.questions.map((question, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={question}
                    onChange={(e) => updateQuestion(index, e.target.value)}
                    placeholder="Enter question"
                    className="flex-1"
                  />
                  {formData.questions.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeQuestion(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Target Contacts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Target Contacts</Label>
              <Button type="button" variant="outline" size="sm" onClick={addContact}>
                <Plus className="h-4 w-4 mr-1" />
                Add Contact
              </Button>
            </div>
            <div className="space-y-3">
              {formData.target_contacts.map((contact, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 border rounded-lg">
                  <Input
                    value={contact.name}
                    onChange={(e) => updateContact(index, "name", e.target.value)}
                    placeholder="Name"
                  />
                  <Input
                    value={contact.phone}
                    onChange={(e) => updateContact(index, "phone", e.target.value)}
                    placeholder="Phone"
                  />
                  <Input
                    value={contact.email}
                    onChange={(e) => updateContact(index, "email", e.target.value)}
                    placeholder="Email"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeContact(index)}
                    className="justify-self-end"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Campaign</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
