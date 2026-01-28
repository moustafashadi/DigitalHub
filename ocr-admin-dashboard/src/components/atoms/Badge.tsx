interface BadgeProps {
  status: "pending" | "processing" | "approved" | "rejected" | string;
}

export default function Badge({ status }: BadgeProps) {
  const statusStyles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const style = statusStyles[status] || "bg-gray-100 text-gray-800";

  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${style}`}>
      {status}
    </span>
  );
}
