'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

interface FinancialCategory {
  id: string
  name: string
  color: string
  percentage: number
  budgetAmount: number
  spentAmount: number
  remainingAmount: number
  description?: string
  transactionCount: number
}

interface FinancialBudget {
  id: string
  year: number
  totalBudget: number
  isApproved: boolean
  creator?: { firstName: string, lastName: string }
  approver?: { firstName: string, lastName: string }
  notes?: string
}

interface FinancialData {
  budget: FinancialBudget | null
  categories: FinancialCategory[]
  totalBudget: number
  totalSpent: number
  year: number
}

export default function CommunityFinancialsPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('')
  const [financialData, setFinancialData] = useState<FinancialData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (slug) {
      fetchFinancialData()
    }
  }, [slug, selectedYear])

  const fetchFinancialData = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${slug}/financials?year=${selectedYear}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch financial data')
      }
      
      const result = await response.json()
      if (result.success) {
        setFinancialData(result.data)
      } else {
        throw new Error(result.error || 'Failed to load financial data')
      }
    } catch (err) {
      console.error('Error fetching financial data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load financial data')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(amount / 100)
  }

  const prepareChartData = (): ChartData<'pie'> => {
    if (!financialData?.categories) {
      return { labels: [], datasets: [] }
    }

    return {
      labels: financialData.categories.map(cat => cat.name),
      datasets: [
        {
          data: financialData.categories.map(cat => cat.percentage),
          backgroundColor: financialData.categories.map(cat => cat.color),
          borderColor: financialData.categories.map(cat => cat.color),
          borderWidth: 2,
          hoverOffset: 4
        }
      ]
    }
  }

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = financialData?.categories[context.dataIndex]
            if (!category) return ''
            return `${context.label}: ${category.percentage}% (${formatCurrency(category.budgetAmount)})`
          }
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading financial data...</p>
        </div>
      </div>
    )
  }

  if (error || !financialData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Data Unavailable</h2>
          <p className="text-gray-600 mb-6">
            {error || 'Financial data is not available for this community yet.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={fetchFinancialData}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
            <Link 
              href={`/c/${slug}`}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Community
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const totalAllocated = financialData.categories.reduce((sum, cat) => sum + cat.budgetAmount, 0)
  const totalSpentAmount = financialData.categories.reduce((sum, cat) => sum + cat.spentAmount, 0)
  const remainingBudget = totalAllocated - totalSpentAmount

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/c/${slug}`}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4"
          >
            ← Back to Community
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Overview</h1>
              <p className="text-gray-600">Transparent budget allocation and spending breakdown</p>
            </div>
            
            {/* Admin Controls */}
            <div className="flex gap-2">
              <Link 
                href={`/c/${slug}/financials/admin`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm inline-flex items-center"
              >
                ⚙️ Admin Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Year Selection */}
        <div className="mb-6">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - i
              return (
                <option key={year} value={year}>
                  {year} Budget
                </option>
              )
            })}
          </select>
        </div>

        {/* Budget Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(financialData.totalBudget)}</div>
            <div className="text-sm text-gray-600">Total Budget</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalSpentAmount)}</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-2xl mb-2">💳</div>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(remainingBudget)}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-2xl font-bold text-purple-600">
              {totalAllocated > 0 ? Math.round((totalSpentAmount / totalAllocated) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">Budget Utilized</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Budget Allocation</h3>
            {financialData.categories.length > 0 ? (
              <div className="h-80">
                <Pie data={prepareChartData()} options={chartOptions} />
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p>No financial categories configured yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Category Breakdown</h3>
            <div className="space-y-4">
              {financialData.categories.map(category => (
                <div key={category.id} className="border-l-4 pl-4 py-2" style={{ borderColor: category.color }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-600">{category.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{category.percentage}%</div>
                      <div className="text-sm text-gray-600">{formatCurrency(category.budgetAmount)}</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: category.color,
                        width: `${category.budgetAmount > 0 ? (category.spentAmount / category.budgetAmount) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Spent: {formatCurrency(category.spentAmount)}</span>
                    <span className="text-green-600">Remaining: {formatCurrency(category.remainingAmount)}</span>
                  </div>
                  
                  {category.transactionCount > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {category.transactionCount} transaction{category.transactionCount !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Status */}
        {financialData.budget && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Budget Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Status</div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  financialData.budget.isApproved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {financialData.budget.isApproved ? '✅ Approved' : '⏳ Pending Approval'}
                </div>
              </div>
              
              {financialData.budget.creator && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Created by</div>
                  <div className="font-medium">
                    {financialData.budget.creator.firstName} {financialData.budget.creator.lastName}
                  </div>
                </div>
              )}
            </div>
            
            {financialData.budget.notes && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-1">Notes</div>
                <div className="text-gray-800">{financialData.budget.notes}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}