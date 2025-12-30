export default function Footer() {
  return (
    <footer className="mt-24 w-full border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold text-black">Chatify</h4>
          <p className="text-sm text-gray-600">
            Simple, fast, and private real-time chat.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-black transition">Privacy</a>
          <a href="#" className="hover:text-black transition">Terms</a>
          <a href="#" className="hover:text-black transition">Contact</a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 text-center sm:text-right">
          © {new Date().getFullYear()} Chatify
        </div>

      </div>
    </footer>
  )
}
