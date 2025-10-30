import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm mt-12">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="text-xl font-bold text-white">Lembo</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              The complete community platform for organizing groups, managing events, and engaging members.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/events" className="text-slate-400 hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/members" className="text-slate-400 hover:text-white transition-colors">Members</Link></li>
              <li><Link href="/chat" className="text-slate-400 hover:text-white transition-colors">Chat</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-slate-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/status" className="text-slate-400 hover:text-white transition-colors">Status</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 Lembo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
