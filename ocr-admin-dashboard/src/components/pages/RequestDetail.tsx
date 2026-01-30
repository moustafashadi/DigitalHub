import { useState } from "react";
import { useParams } from "react-router-dom";
import { useOCRRequest } from "../../hooks/useOCRRequests";
import { Badge, Button } from "../atoms";
import { Modal } from "../organisms";
import { useNavigate } from "react-router-dom";
import type { OCRRequest } from "../../types";

type ActionType = "approve" | "reject" | "reprocess" | null;

export default function RequestDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { request, loading, error, updateStatus } = useOCRRequest(id);

  const [actionModal, setActionModal] = useState<ActionType>(null);
  const [actionNote, setActionNote] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleAction = async () => {
    if (!actionModal) return;

    let newStatus: OCRRequest["status"];
    switch (actionModal) {
      case "approve":
        newStatus = "approved";
        break;
      case "reject":
        newStatus = "rejected";
        break;
      case "reprocess":
        newStatus = "processing";
        break;
      default:
        return;
    }

    setUpdating(true);
    await updateStatus(newStatus, actionNote || undefined);
    setUpdating(false);
    setActionModal(null);
    setActionNote("");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-8 text-gray-500">Request not found</div>
    );
  }

  const { extractedData, statusHistory } = request;

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/requests")}
          className="text-gray-600 hover:text-gray-800"
        >
          &larr; Back to list
        </button>
        <h2 className="text-2xl font-bold">{request.name}</h2>
        <Badge status={request.status} />
      </div>

        {/* extracted data */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Extracted Data</h3>

          {extractedData ? (
            <dl className="space-y-3">
              {Object.entries(extractedData).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm text-gray-500">{key}</dt>
                  <dd className="text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-gray-500">No data extracted yet</p>
          )}
        </div>

        {/* status history timeline */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Status History</h3>

          <div className="space-y-4">
            {statusHistory.map((entry, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  {index < statusHistory.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2">
                    <Badge status={entry.status} />
                    <span className="text-sm text-gray-500">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {entry.note} - by {entry.changedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* actions */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => setActionModal("approve")}
              disabled={request.status === "approved"}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              onClick={() => setActionModal("reject")}
              disabled={request.status === "rejected"}
            >
              Reject
            </Button>
            <Button
              variant="secondary"
              onClick={() => setActionModal("reprocess")}
              disabled={request.status === "processing"}
            >
              Re-process
            </Button>
          </div>
        </div>

      {/* action confirmation modal */}
      <Modal
        isOpen={actionModal !== null}
        onClose={() => {
          setActionModal(null);
          setActionNote("");
        }}
        title={`Confirm ${actionModal}`}
        onConfirm={handleAction}
        confirmText={
          actionModal === "approve"
            ? "Approve"
            : actionModal === "reject"
              ? "Reject"
              : "Re-process"
        }
        confirmVariant={actionModal === "reject" ? "danger" : "primary"}
        loading={updating}
      >
        <div>
          <p className="mb-4">
            Are you sure you want to {actionModal} this request?
          </p>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note (optional)
          </label>
          <textarea
            value={actionNote}
            onChange={(e) => setActionNote(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Add a note..."
          />
        </div>
      </Modal>
    </>
  );
}
