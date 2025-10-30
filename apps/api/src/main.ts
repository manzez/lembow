import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

// Health
app.get('/health', (_req, res) => res.json({ ok: true }))

// Magic link (dev stub): returns a token you can paste into web
app.post('/auth/magic-link', (req, res) => {
  const { email, purpose = 'AUTH' } = req.body || {}
  if (!email) return res.status(400).json({ error: 'email required' })
  const token = jwt.sign({ email, purpose }, JWT_SECRET, { expiresIn: '15m' })
  return res.json({ token })
})

// Verify token
app.post('/auth/verify', (req, res) => {
  const { token } = req.body || {}
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    return res.json({ ok: true, payload })
  } catch (e) {
    return res.status(401).json({ ok: false })
  }
})

// Minimal endpoints (stubs)
app.get('/communities/:slug', (req, res) => {
  res.json({
    slug: req.params.slug,
    name: 'Sample Community',
    howToPay: 'Bank details here',
  })
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
