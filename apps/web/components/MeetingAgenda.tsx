'use client'
import React, { useState } from 'react'
import { Plus, Clock, User, CheckCircle, Circle, XCircle, Edit2, Save, X } from 'lucide-react'

interface AgendaItem {
  id?: string
  title: string
  description?: string
  orderIndex: number
  duration?: number
  presenter?: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED'
  notes?: string
}

interface MeetingAgendaProps {
  eventId: string
  initialAgenda?: AgendaItem[]
  isEditable?: boolean
  onAgendaUpdate?: (agenda: AgendaItem[]) => void
  onStatusUpdate?: (agendaId: string, status: string, notes?: string) => void
  className?: string
}

export default function MeetingAgenda({
  eventId,
  initialAgenda = [],
  isEditable = true,
  onAgendaUpdate,
  onStatusUpdate,
  className = ''
}: MeetingAgendaProps) {
  const [agenda, setAgenda] = useState<AgendaItem[]>(initialAgenda)
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [newItem, setNewItem] = useState<Partial<AgendaItem>>({
    title: '',
    description: '',
    duration: 15,
    presenter: ''
  })

  const addAgendaItem = () => {
    if (!newItem.title?.trim()) return

    const item: AgendaItem = {
      title: newItem.title,
      description: newItem.description || '',
      orderIndex: agenda.length,
      duration: newItem.duration || 15,
      presenter: newItem.presenter || '',
      status: 'PENDING'
    }

    const updatedAgenda = [...agenda, item]
    setAgenda(updatedAgenda)
    setNewItem({ title: '', description: '', duration: 15, presenter: '' })
    
    if (onAgendaUpdate) {
      onAgendaUpdate(updatedAgenda)
    }
  }

  const updateAgendaItem = (index: number, updates: Partial<AgendaItem>) => {
    const updatedAgenda = agenda.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    )
    setAgenda(updatedAgenda)
    
    if (onAgendaUpdate) {
      onAgendaUpdate(updatedAgenda)
    }
  }

  const removeAgendaItem = (index: number) => {
    const updatedAgenda = agenda.filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, orderIndex: i }))
    setAgenda(updatedAgenda)
    
    if (onAgendaUpdate) {
      onAgendaUpdate(updatedAgenda)
    }
  }

  const updateItemStatus = async (item: AgendaItem, index: number, newStatus: AgendaItem['status'], notes?: string) => {
    if (item.id && onStatusUpdate) {
      await onStatusUpdate(item.id, newStatus, notes)
    }
    updateAgendaItem(index, { status: newStatus, notes })
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= agenda.length) return

    const updatedAgenda = [...agenda]
    const [movedItem] = updatedAgenda.splice(index, 1)
    updatedAgenda.splice(newIndex, 0, movedItem)
    
    // Update order indices
    updatedAgenda.forEach((item, i) => {
      item.orderIndex = i
    })
    
    setAgenda(updatedAgenda)
    
    if (onAgendaUpdate) {
      onAgendaUpdate(updatedAgenda)
    }
  }

  const getStatusColor = (status: AgendaItem['status']) => {
    switch (status) {
      case 'PENDING': return 'text-gray-500'
      case 'IN_PROGRESS': return 'text-blue-600'
      case 'COMPLETED': return 'text-green-600'
      case 'SKIPPED': return 'text-red-600'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: AgendaItem['status']) => {
    switch (status) {
      case 'PENDING': return <Circle size={16} />
      case 'IN_PROGRESS': return <Clock size={16} className="animate-spin" />
      case 'COMPLETED': return <CheckCircle size={16} />
      case 'SKIPPED': return <XCircle size={16} />
      default: return <Circle size={16} />
    }
  }

  const totalDuration = agenda.reduce((total, item) => total + (item.duration || 0), 0)

  return (
    <div className={`meeting-agenda bg-white rounded-lg border ${className}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Meeting Agenda</h3>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">
              Total: {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
            </div>
            {isEditable && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Edit2 size={14} />
                {isEditing ? 'Done' : 'Edit'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Agenda Items */}
        {agenda.map((item, index) => (
          <div key={index} className="agenda-item border rounded-lg p-3 bg-gray-50">
            <div className="flex items-start gap-3">
              {/* Status Icon */}
              <div className={`flex-shrink-0 mt-1 ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {editingItem === index ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateAgendaItem(index, { title: e.target.value })}
                      className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => updateAgendaItem(index, { description: e.target.value })}
                      placeholder="Description (optional)"
                      className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={item.duration}
                        onChange={(e) => updateAgendaItem(index, { duration: parseInt(e.target.value) || 0 })}
                        placeholder="Duration (min)"
                        className="w-20 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={item.presenter}
                        onChange={(e) => updateAgendaItem(index, { presenter: e.target.value })}
                        placeholder="Presenter"
                        className="flex-1 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(null)}
                        className="flex items-center gap-1 px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        <Save size={12} />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        <X size={12} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      {item.duration && (
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {item.duration}min
                        </div>
                      )}
                      {item.presenter && (
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          {item.presenter}
                        </div>
                      )}
                    </div>
                    {item.notes && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                        <strong>Notes:</strong> {item.notes}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Controls */}
              {isEditing && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === agenda.length - 1}
                    className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => setEditingItem(index)}
                    className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeAgendaItem(index)}
                    className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Status Controls */}
              {!isEditing && isEditable && (
                <div className="flex gap-1">
                  <select
                    value={item.status}
                    onChange={(e) => updateItemStatus(item, index, e.target.value as AgendaItem['status'])}
                    className="text-xs border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="SKIPPED">Skipped</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add New Item */}
        {isEditing && (
          <div className="agenda-item border-2 border-dashed border-gray-300 rounded-lg p-3">
            <div className="space-y-3">
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Agenda item title"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Description (optional)"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  value={newItem.duration}
                  onChange={(e) => setNewItem({ ...newItem, duration: parseInt(e.target.value) || 0 })}
                  placeholder="Duration (min)"
                  className="w-32 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={newItem.presenter}
                  onChange={(e) => setNewItem({ ...newItem, presenter: e.target.value })}
                  placeholder="Presenter (optional)"
                  className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={addAgendaItem}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>
          </div>
        )}

        {agenda.length === 0 && !isEditing && (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-2">No agenda items yet</div>
            {isEditable && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Click "Edit" to add agenda items
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}