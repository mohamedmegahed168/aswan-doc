function handleSignUP() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8 min-h-96">
          <h1 className="text-3xl font-bold"> Sign Up Page </h1>
          <form className="space-y-6">
            <div className="">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 m-2"
              >
                {" "}
                Name:{" "}
              </label>
              <input
                type="text"
                placeholder="full name"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 m-2"
              >
                Email:
              </label>
              <input
                type="email"
                placeholder="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 m-2"
              >
                Password:
              </label>
              <input
                type="password"
                placeholder="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all cursor-pointer">
              {" "}
              Sign Up{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default handleSignUP;
