const header_status = "header_status";

type StatusType = "close" | "open";

export function setStatus(status: StatusType) {
  localStorage.setItem(header_status, status);
}

export function getStatus(): StatusType | null {
  return localStorage.getItem(header_status) as StatusType | null;
}

export function deleteStatus() {
  localStorage.removeItem(header_status);
}
