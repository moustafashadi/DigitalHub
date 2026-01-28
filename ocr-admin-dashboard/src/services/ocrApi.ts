import axios from "axios";
import type { OCRRequest, StatusHistoryEntry } from "../types";

const API_URL = "http://localhost:3001/requests";

export async function fetchRequests():Promise<OCRRequest[]> {
    const response = await axios.get<OCRRequest[]>(API_URL);
    return response.data;
}

export async function fetchRequestById(id: string): Promise<OCRRequest> {
    const response = await axios.get<OCRRequest>(`${API_URL}/${id}`);
    return response.data;
}

export type RequestStatus = "pending" | "processing" | "approved" | "rejected";

export async function updateRequestStatus(
    id: string,
    newStatus: RequestStatus,
    note?: string,
): Promise<OCRRequest> {
    const currentReq = await fetchRequestById(id);

    const historyEntry: StatusHistoryEntry = {
        status: newStatus,
        timestamp: new Date().toISOString(),
        changedBy: "admin",
        note: note || `status changed to ${newStatus}`,
    }

    const updatedReq: OCRRequest = {
        ...currentReq,
        status: newStatus,
        statusHistory: [...currentReq.statusHistory, historyEntry],
    }

    const response = await axios.put<OCRRequest>(`${API_URL}/${id}`, updatedReq);
    return response.data;
}


