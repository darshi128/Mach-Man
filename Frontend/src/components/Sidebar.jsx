import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white fixed left-0 top-0">
      {/* LOGO */}
      <div className="h-20 flex items-center px-6 border-b border-slate-700">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold mr-3">
          MMS
        </div>

        <div>
          <h1 className="font-bold text-lg">MMS</h1>
          <p className="text-xs text-slate-400">Machine Management</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white text-left">
          📊
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => navigate("/machines")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition text-left cursor-pointer"
        >
          🏭
          <span>Machines</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition text-left cursor-pointer">
          👷
          <span>Operators</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition text-left cursor-pointer">
          🔧
          <span>Maintenance</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition text-left cursor-pointer">
          📈
          <span>Reports</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
