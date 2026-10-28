import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-64">

        {/* NAVBAR */}
        <Navbar />

        {/* DASHBOARD CONTENT */}
        <main className="p-8">

          {/* WELCOME */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome to MMS 👋
            </h1>

            <p className="text-slate-500 mt-2">
              Here's what's happening with your machines today.
            </p>
          </div>

          {/* STATISTICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* TOTAL MACHINES */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">

                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl">
                  🏭
                </div>

                <span className="text-sm text-slate-400">
                  Total
                </span>

              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                25
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Total Machines
              </p>
            </div>

            {/* OPERATIONAL */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">

                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-2xl">
                  ✓
                </div>

                <span className="text-sm text-green-600 font-medium">
                  Active
                </span>

              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                18
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Operational
              </p>
            </div>

            {/* MAINTENANCE */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">

                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center text-2xl">
                  🔧
                </div>

                <span className="text-sm text-yellow-600 font-medium">
                  Service
                </span>

              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                4
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Under Maintenance
              </p>
            </div>

            {/* BREAKDOWN */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">

                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-2xl">
                  ⚠
                </div>

                <span className="text-sm text-red-600 font-medium">
                  Attention
                </span>

              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                3
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Breakdown
              </p>
            </div>

          </div>

          {/* LOWER SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-lg font-bold text-slate-800">
                  Recent Activity
                </h2>

                <button className="text-sm text-blue-600 hover:underline cursor-pointer">
                  View All
                </button>

              </div>

              <div className="space-y-5">

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Machine BHEL-M001 is operational
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      10 minutes ago
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                    🔧
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      BHEL-M002 sent for maintenance
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      1 hour ago
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    ⚠
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      BHEL-M003 reported a breakdown
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      2 hours ago
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* MACHINE STATUS */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">

              <h2 className="text-lg font-bold text-slate-800 mb-6">
                Machine Status
              </h2>

              <div className="space-y-6">

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">
                      Operational
                    </span>

                    <span className="text-sm font-semibold text-slate-700">
                      72%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-[72%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">
                      Under Maintenance
                    </span>

                    <span className="text-sm font-semibold text-slate-700">
                      16%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full">
                    <div className="h-2 bg-yellow-500 rounded-full w-[16%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">
                      Breakdown
                    </span>

                    <span className="text-sm font-semibold text-slate-700">
                      12%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full">
                    <div className="h-2 bg-red-500 rounded-full w-[12%]"></div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;