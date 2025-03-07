export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-bold text-center mb-6">RESET PASSWORD</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-sm font-medium">
                ENTER YOUR NEW PASSWORD
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="NEW PASSWORD"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                CONFIRM YOUR PASSWORD
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="CONFIRM PASSWORD"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-2">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

