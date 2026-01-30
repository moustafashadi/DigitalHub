import { useNavigate } from "react-router-dom";
import { RequestTable } from "../organisms";
import { useOCRRequests } from "../../hooks/useOCRRequests";
import { SearchInput, StatusFilter } from "../molecules";
import type { OCRRequest } from "../../types";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

export default function RequestsListPage() {
  const navigate = useNavigate();

  const {
    requests,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useOCRRequests();

  const handleRowClick = (id: string) => {
    navigate(`/requests/${id}`);
  };

  const [rawSearch, setRawSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(rawSearch, 300);
  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);
  

  const handleStatusChange = (value: OCRRequest["status"] | "all") => setStatusFilter(value);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">OCR Requests</h2>

      {/* filters */}
      <div className="flex gap-4 mb-4">
        <SearchInput value={rawSearch} onChange={setRawSearch} />

        <StatusFilter value={statusFilter} onChange={handleStatusChange} />
      </div>

      <RequestTable
        requests={requests}
        onRowClick={handleRowClick}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        totalItems={totalItems}
      />
    </div>
  );
}
