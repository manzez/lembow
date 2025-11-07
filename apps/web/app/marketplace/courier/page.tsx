'use client'

import { useState } from 'react'
import { Package, MapPin, Weight, Box, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CourierPage() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    pickupAddress: '',
    pickupCity: '',
    pickupPostcode: '',
    recipientName: '',
    recipientPhone: '',
    destinationAddress: '',
    destinationCity: '',
    destinationCountry: '',
    destinationPostcode: '',
    packageContent: '',
    packageWeight: '',
    packageSize: '',
    specialInstructions: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // TODO: Send to API
    console.log('Courier request:', formData)
    
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Received!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Thank you for your courier request. We've forwarded your details to our trusted delivery partners. 
            One of our courier services will contact you within 2 hours to provide a quote and arrange collection.
          </p>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
            <p className="text-green-800 font-medium mb-2">
              📦 What happens next?
            </p>
            <ul className="text-left text-green-700 space-y-2 text-sm">
              <li>✓ Our partner will call you to confirm pickup details</li>
              <li>✓ You'll receive a quote based on weight, size, and destination</li>
              <li>✓ Once agreed, they'll arrange collection at your convenience</li>
              <li>✓ Track your package from pickup to delivery</li>
            </ul>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Marketplace
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              International Courier Services
            </h1>
            <p className="text-xl text-green-100">
              Reliable door-to-door delivery to anywhere in the world
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-xl">
              
              {/* Sender Details */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-green-600" />
                  Sender Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="senderName"
                      required
                      value={formData.senderName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="senderPhone"
                      required
                      value={formData.senderPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="senderEmail"
                      required
                      value={formData.senderEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Address *</label>
                    <input
                      type="text"
                      name="pickupAddress"
                      required
                      placeholder="Street address"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="pickupCity"
                      required
                      value={formData.pickupCity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Postcode *</label>
                    <input
                      type="text"
                      name="pickupPostcode"
                      required
                      value={formData.pickupPostcode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Destination Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Name *</label>
                    <input
                      type="text"
                      name="recipientName"
                      required
                      value={formData.recipientName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Phone *</label>
                    <input
                      type="tel"
                      name="recipientPhone"
                      required
                      value={formData.recipientPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address *</label>
                    <input
                      type="text"
                      name="destinationAddress"
                      required
                      placeholder="Street address"
                      value={formData.destinationAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Destination City *</label>
                    <input
                      type="text"
                      name="destinationCity"
                      required
                      value={formData.destinationCity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                    <input
                      type="text"
                      name="destinationCountry"
                      required
                      value={formData.destinationCountry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Postcode/ZIP</label>
                    <input
                      type="text"
                      name="destinationPostcode"
                      value={formData.destinationPostcode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Box className="w-6 h-6 text-purple-600" />
                  Package Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Package Contents *</label>
                    <textarea
                      name="packageContent"
                      required
                      rows={3}
                      placeholder="Describe what you're sending..."
                      value={formData.packageContent}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Approximate Weight *</label>
                    <select
                      name="packageWeight"
                      required
                      value={formData.packageWeight}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select weight</option>
                      <option value="0-5kg">0-5 kg</option>
                      <option value="5-10kg">5-10 kg</option>
                      <option value="10-20kg">10-20 kg</option>
                      <option value="20-30kg">20-30 kg</option>
                      <option value="30kg+">30 kg+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Package Size *</label>
                    <select
                      name="packageSize"
                      required
                      value={formData.packageSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select size</option>
                      <option value="small">Small (shoebox)</option>
                      <option value="medium">Medium (suitcase)</option>
                      <option value="large">Large (multiple boxes)</option>
                      <option value="oversized">Oversized/Pallet</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
                    <textarea
                      name="specialInstructions"
                      rows={3}
                      placeholder="Fragile items, preferred collection time, etc."
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Submit Courier Request
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Our courier partner will contact you within 2 hours
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
