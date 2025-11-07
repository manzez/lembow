// Using native fetch (Node.js 18+)

async function testFinancialAPI() {
  const baseURL = 'http://localhost:4001'
  
  try {
    console.log('🧪 Testing Financial Transparency API\n')
    
    // Test 1: Health check
    console.log('1️⃣ Health Check...')
    const healthResponse = await fetch(`${baseURL}/health`)
    const healthData = await healthResponse.json()
    console.log('✅ Health:', healthData)
    console.log()
    
    // Test 2: List all communities to see what exists
    console.log('2️⃣ Listing existing communities...')
    const communitiesResponse = await fetch(`${baseURL}/communities`)
    const communitiesData = await communitiesResponse.json()
    console.log('🏘️ Communities:', JSON.stringify(communitiesData, null, 2))
    console.log()
    
    // Use the first community if available, or create a test one
    let communitySlug = 'test-community'
    if (communitiesData.communities && communitiesData.communities.length > 0) {
      communitySlug = communitiesData.communities[0].slug
      console.log(`📍 Using existing community: ${communitySlug}`)
    } else {
      console.log('📍 No communities found, using test slug: ' + communitySlug)
    }
    console.log()
    
    // Test 3: Create default financial categories
    console.log('3️⃣ Creating default financial categories...')
    const createResponse = await fetch(`${baseURL}/communities/${communitySlug}/financial-categories/defaults`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer fake-token',
        'Content-Type': 'application/json'
      }
    })
    
    const createData = await createResponse.json()
    console.log('📊 Create response:', JSON.stringify(createData, null, 2))
    console.log()
    
    // Test 4: Get financial overview
    console.log('4️⃣ Fetching financial overview...')
    const overviewResponse = await fetch(`${baseURL}/communities/${communitySlug}/financials`)
    const overviewData = await overviewResponse.json()
    console.log('💰 Financial overview:', JSON.stringify(overviewData, null, 2))
    console.log()
    
    // Test 5: Get financial categories (admin)
    console.log('5️⃣ Fetching financial categories (admin)...')
    const categoriesResponse = await fetch(`${baseURL}/communities/${communitySlug}/financial-categories`, {
      headers: {
        'Authorization': 'Bearer fake-token'
      }
    })
    const categoriesData = await categoriesResponse.json()
    console.log('🏷️ Categories:', JSON.stringify(categoriesData, null, 2))
    
    console.log('\n✅ All tests completed successfully!')
    
  } catch (error) {
    console.error('❌ Test error:', error)
  }
}

testFinancialAPI()