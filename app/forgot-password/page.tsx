export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-bold text-center mb-6">FORGOT PASSWORD</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter email"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">FORGOT PASSWORD</p>
              <label className="flex items-center space-x-2">
                <input type="radio" name="method" value="gmail" className="h-4 w-4" checked />
                <span>VIA GMAIL</span>
              </label>
            </div>

            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium">
                VERIFICATION CODE
              </label>
              <div className="flex gap-2">
                <input
                  id="code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter code"
                />
                <button className="bg-gray-200 px-3 py-2 rounded-md text-sm">60s</button>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-2">Enter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

