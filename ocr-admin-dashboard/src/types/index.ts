// user type for auth
export interface User {
  id: string;
  username: string;
  role: string;
}

// main ocr request entity
export interface OCRRequest {
  id: string;
  name: string;
  status: "pending" | "processing" | "approved" | "rejected";
  submittedAt: string;
  submittedBy: string;
  documentType: string;
  extractedData: OCRExtractedData | null;
  statusHistory: StatusHistoryEntry[];
}

// what the ocr extracted from the doc
export interface OCRExtractedData {
  fullName?: string;
  dateOfBirth?: string;
  documentNumber?: string;
  expiryDate?: string;
  address?: string;
  // can have other fields depending on doc type
  [key: string]: string | undefined;
}

export interface StatusHistoryEntry {
  status: string;
  timestamp: string;
  changedBy: string;
  note?: string;
}

// redux state shapes
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface OCRRequestsState {
  ids: string[];
  entities: Record<string, OCRRequest>;
  selectedRequest: OCRRequest | null;
  loading: boolean;
  error: string | null;
  // pagination
  currentPage: number;
  totalPages: number;
  pageSize: number;
  // filters
  statusFilter: string;
  searchQuery: string;
}

// api response types
export interface LoginResponse {
  user: User;
  token: string;
}

export interface RequestsListResponse {
  requests: OCRRequest[];
  total: number;
  page: number;
  pageSize: number;
}

export interface StatusHistoryEntry {
  status: string;
  timestamp: string;
  changedBy: string;
  note?: string;
}
