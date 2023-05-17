const token_key = "id";

export function setToken(token: string) {
  localStorage.setItem(token_key, token);
}

export function getToken(): string | null {
  return localStorage.getItem(token_key);
}

export function deleteToken() {
  localStorage.removeItem(token_key);
}
