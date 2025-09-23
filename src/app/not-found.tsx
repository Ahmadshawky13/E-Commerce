import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
      >
      </Link>
    </div>
  )
}
