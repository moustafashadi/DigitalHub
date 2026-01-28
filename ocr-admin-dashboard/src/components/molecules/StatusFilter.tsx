import type { ChangeEvent } from "react";
import { useOCRRequests } from "../../hooks/useOCRRequests";
import type { OCRRequest, OCRRequestsState } from "../../types";

// select + label

function StatusFilter( statusFilter: OCRRequest["status"] ) {
  const { setStatusFilter } = useOCRRequests();

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor="status"
        className="block text-sm font-medium text-gray-700"
      >
        Status
      </label>
      <select
        value={statusFilter}
        onChange={handleStatusChange}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}

export default StatusFilter;
