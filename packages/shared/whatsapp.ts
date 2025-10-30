export function waLink(number: string, text: string) {
  const base = `https://wa.me/${encodeURIComponent(number)}`
  const q = `?text=${encodeURIComponent(text)}`
  return base + q
}

export function duesDeepLink(appUrl: string, token: string) {
  return `${appUrl.replace(/\/$/, '')}/r/dues?token=${encodeURIComponent(token)}`
}
