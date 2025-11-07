'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface FinancialCategory {
  id: string
  name: string
  color: string
  percentage: number
  budgetAmount: number
  description?: string
  order: number
  isActive: boolean
}

export default function CommunityFinancialsAdminPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('')
  const [categories, setCategories] = useState<FinancialCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (slug) {
      fetchCategories()
    }
  }, [slug])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      // TODO: Replace with proper auth token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${slug}/financial-categories`,
        {
          headers: {
            'Authorization': 'Bearer fake-token' // TODO: Implement proper auth
          }
        }
      )
      
      if (response.status === 401) {
        setError('You need to be logged in as an admin to access this page.')
        return
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch financial categories')
      }
      
      const result = await response.json()
      if (result.success) {
        setCategories(result.categories || [])
      } else {
        throw new Error(result.error || 'Failed to load categories')
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError(err instanceof Error ? err.message : 'Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const createDefaultCategories = async () => {
    try {
      setSaving(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${slug}/financial-categories/defaults`,
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer fake-token', // TODO: Implement proper auth
            'Content-Type': 'application/json'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error('Failed to create default categories')
      }
      
      const result = await response.json()
      if (result.success) {
        setCategories(result.categories)
        setError(null)
      } else {
        throw new Error(result.error || 'Failed to create categories')
      }
    } catch (err) {
      console.error('Error creating default categories:', err)
      setError(err instanceof Error ? err.message : 'Failed to create categories')
    } finally {
      setSaving(false)
    }
  }

  const updateCategory = async (categoryId: string, updates: Partial<FinancialCategory>) => {
    try {
      setSaving(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${slug}/financial-categories/${categoryId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer fake-token', // TODO: Implement proper auth
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updates)
        }
      )
      
      if (!response.ok) {
        throw new Error('Failed to update category')
      }
      
      const result = await response.json()
      if (result.success) {
        setCategories(prev => prev.map(cat => 
          cat.id === categoryId ? { ...cat, ...result.category } : cat
        ))
        setEditingCategory(null)
      } else {
        throw new Error(result.error || 'Failed to update category')
      }
    } catch (err) {
      console.error('Error updating category:', err)
      setError(err instanceof Error ? err.message : 'Failed to update category')
    } finally {
      setSaving(false)
    }
  }

  const handlePercentageChange = (categoryId: string, newPercentage: number) => {
    // Ensure total doesn't exceed 100%
    const otherCategories = categories.filter(cat => cat.id !== categoryId)
    const otherTotal = otherCategories.reduce((sum, cat) => sum + cat.percentage, 0)
    
    if (otherTotal + newPercentage > 100) {
      setError('Total percentage cannot exceed 100%. Please adjust other categories first.')
      return
    }
    
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, percentage: newPercentage } : cat
    ))
    setError(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(amount / 100)
  }

  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/c/${slug}/financials`}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4"
          >
            ← Back to Financials
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Settings</h1>
          <p className="text-gray-600">Manage budget categories and allocation percentages</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-400 text-xl mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {categories.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">No Financial Categories Set Up</h3>
            <p className="text-gray-600 mb-6">
              Create default financial categories to start tracking your community budget allocation.
            </p>
            <button
              onClick={createDefaultCategories}
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {saving ? 'Creating...' : 'Create Default Categories'}
            </button>
          </div>
        ) : (
          <>
            {/* Budget Allocation Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Budget Allocation Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${totalPercentage === 100 ? 'text-green-600' : totalPercentage > 100 ? 'text-red-600' : 'text-yellow-600'}`}>
                    {totalPercentage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Total Allocated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${totalPercentage === 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {totalPercentage === 100 ? '✅' : '⚠️'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {totalPercentage === 100 ? 'Balanced' : 'Needs Adjustment'}
                  </div>
                </div>
              </div>
              
              {totalPercentage !== 100 && (
                <div className={`mt-4 p-3 rounded-lg ${totalPercentage > 100 ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  <p className="text-sm">
                    {totalPercentage > 100 
                      ? `Budget is over-allocated by ${(totalPercentage - 100).toFixed(1)}%. Please reduce some categories.`
                      : `Budget has ${(100 - totalPercentage).toFixed(1)}% unallocated. Consider distributing to existing categories.`
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Categories Management */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Financial Categories</h3>
                <button
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Save All Changes
                </button>
              </div>

              <div className="space-y-4">
                {categories.map(category => (
                  <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-3"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                      </div>
                      <button
                        onClick={() => setEditingCategory(editingCategory === category.id ? null : category.id)}
                        className="text-purple-600 hover:text-purple-700 text-sm"
                      >
                        {editingCategory === category.id ? 'Cancel' : 'Edit'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Percentage Allocation
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={category.percentage}
                            onChange={(e) => handlePercentageChange(category.id, parseFloat(e.target.value) || 0)}
                            disabled={editingCategory !== category.id}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 text-sm"
                          />
                          <span className="ml-2 text-gray-600">%</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Budget Amount
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="100"
                          value={category.budgetAmount}
                          onChange={(e) => {
                            const newAmount = parseInt(e.target.value) || 0
                            setCategories(prev => prev.map(cat => 
                              cat.id === category.id ? { ...cat, budgetAmount: newAmount } : cat
                            ))
                          }}
                          disabled={editingCategory !== category.id}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 text-sm"
                          placeholder="Amount in pence"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {formatCurrency(category.budgetAmount)}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Color
                        </label>
                        <input
                          type="color"
                          value={category.color}
                          onChange={(e) => {
                            setCategories(prev => prev.map(cat => 
                              cat.id === category.id ? { ...cat, color: e.target.value } : cat
                            ))
                          }}
                          disabled={editingCategory !== category.id}
                          className="w-16 h-8 border border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={category.description || ''}
                        onChange={(e) => {
                          setCategories(prev => prev.map(cat => 
                            cat.id === category.id ? { ...cat, description: e.target.value } : cat
                          ))
                        }}
                        disabled={editingCategory !== category.id}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 text-sm"
                        placeholder="Brief description of this budget category"
                      />
                    </div>

                    {editingCategory === category.id && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => updateCategory(category.id, {
                            percentage: category.percentage,
                            budgetAmount: category.budgetAmount,
                            color: category.color,
                            description: category.description
                          })}
                          disabled={saving}
                          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory(null)
                            fetchCategories() // Reset changes
                          }}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}