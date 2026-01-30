import type { OCRRequest } from "../../types";

// select + label

function StatusFilter({
  value,
  onChange,
}: {
  value: OCRRequest["status"] | "all";
  onChange: (value: OCRRequest["status"] | "all") => void;
}) {


  return (
    <div>
      <label
        htmlFor="status"
        className="block text-sm font-medium text-gray-700"
      >
        Status
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as OCRRequest["status"])}
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
