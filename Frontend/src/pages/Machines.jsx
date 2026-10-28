
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/machine";

const initialFormData = {
  machineId: "",
  machineName: "",
  machineType: "",
  department: "",
  location: "",
  status: "Operational",
  purchaseDate: "",
  description: "",
};

function Machines() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  // =========================
  // FETCH ALL MACHINES
  // =========================
  const fetchMachines = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/all`, {
        withCredentials: true,
      });

      const machineList = Array.isArray(response?.data?.machines)
        ? response.data.machines
        : [];

      setMachines(machineList);
      setError("");
    } catch (error) {
      console.error("Fetch machines error:", error);

      if (error.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }

      setError(
        error.response?.data?.message ||
          "Failed to fetch machines."
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Fetch machines when page loads
  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  // =========================
  // HANDLE FORM INPUTS
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD MACHINE
  // =========================
  const handleAddMachine = async (e) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      await axios.post(`${API_URL}/add`, formData, {
        withCredentials: true,
      });

      alert("Machine added successfully!");

      // Close modal
      setShowForm(false);

      // Reset form
      setFormData({ ...initialFormData });

      // Refresh machine list
      await fetchMachines();
    } catch (error) {
      console.error("Add machine error:", error);

      if (error.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to add machine."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // =========================
  // CLOSE FORM
  // =========================
  const handleCloseForm = () => {
    if (isSaving) return;

    setShowForm(false);
    setFormData({ ...initialFormData });
  };

  // =========================
  // RETRY FETCH
  // =========================
  const handleRetry = () => {
    setLoading(true);
    setError("");
    fetchMachines();
  };

  // =========================
  // STATUS STYLE
  // =========================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-700";

      case "Under Maintenance":
        return "bg-yellow-100 text-yellow-700";

      case "Breakdown":
        return "bg-red-100 text-red-700";

      case "Inactive":
        return "bg-slate-100 text-slate-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-8">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Machines
          </h1>

          <p className="text-slate-500 mt-2">
            Manage and monitor all machines.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition cursor-pointer"
        >
          + Add Machine
        </button>

      </div>

      {/* =========================
          MACHINE COUNT
      ========================= */}
      <div className="mb-5">
        <p className="text-sm text-slate-500">
          Total machines:{" "}
          <span className="font-semibold text-slate-800">
            {machines.length}
          </span>
        </p>
      </div>

      {/* =========================
          MACHINE TABLE
      ========================= */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">

        {/* LOADING */}
        {loading ? (
          <p className="p-8 text-center text-slate-500">
            Loading machines...
          </p>

        ) : error ? (

          /* ERROR */
          <div className="p-8 text-center">

            <p className="text-red-600 mb-4">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>

          </div>

        ) : machines.length === 0 ? (

          /* NO MACHINES */
          <p className="p-8 text-center text-slate-500">
            No machines found. Add your first machine.
          </p>

        ) : (

          /* MACHINE TABLE */
          <table className="w-full min-w-[850px]">

            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Machine ID
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Name
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Type
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Department
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Location
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {machines.map((machine) => (
                <tr
                  key={machine._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-4 font-medium text-slate-700">
                    {machine.machineId}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {machine.machineName}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {machine.machineType}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {machine.department}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {machine.location}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                        machine.status
                      )}`}
                    >
                      {machine.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* =========================
          ADD MACHINE MODAL
      ========================= */}
      {showForm && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">

            {/* MODAL HEADER */}
            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Add New Machine
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Enter the machine details below.
                </p>

              </div>

              <button
                type="button"
                onClick={handleCloseForm}
                disabled={isSaving}
                className="text-slate-500 hover:text-red-600 text-3xl disabled:opacity-50"
                aria-label="Close form"
              >
                &times;
              </button>

            </div>

            {/* =========================
                FORM
            ========================= */}
            <form
              onSubmit={handleAddMachine}
              className="space-y-5"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* MACHINE ID */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Machine ID *
                  </label>

                  <input
                    type="text"
                    name="machineId"
                    value={formData.machineId}
                    onChange={handleChange}
                    placeholder="BHEL-M004"
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                {/* MACHINE NAME */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Machine Name *
                  </label>

                  <input
                    type="text"
                    name="machineName"
                    value={formData.machineName}
                    onChange={handleChange}
                    placeholder="CNC Machine"
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                {/* MACHINE TYPE */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Machine Type *
                  </label>

                  <input
                    type="text"
                    name="machineType"
                    value={formData.machineType}
                    onChange={handleChange}
                    placeholder="CNC"
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                {/* DEPARTMENT */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Department *
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Production"
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                {/* LOCATION */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location *
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Workshop A"
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                {/* STATUS */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  >

                    <option value="Operational">
                      Operational
                    </option>

                    <option value="Under Maintenance">
                      Under Maintenance
                    </option>

                    <option value="Breakdown">
                      Breakdown
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

                {/* PURCHASE DATE */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Purchase Date
                  </label>

                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>

              {/* DESCRIPTION */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter machine details..."
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />

              </div>

              {/* FORM BUTTONS */}
              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={handleCloseForm}
                  disabled={isSaving}
                  className="px-5 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save Machine"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Machines;

