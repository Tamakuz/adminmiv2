export const getUsers = async (token?: string) => {
  const response = await fetch("/api/user", {
    headers: token ? {
      Authorization: `Bearer ${token}`
    } : {}
  });
  const data = await response.json();
  return data;
}

export const putRoleStatus = async (id: string, role: string, status: string, token: string) => {
  const response = await fetch(`/api/user/role-status/${id}`, {
    method: "PUT",
    headers: token ? {
      Authorization: `Bearer ${token}`
    } : {},
    body: JSON.stringify({ role, status })
  });
  const data = await response.json();
  return data;
}

export const deleteUser = async (id: string, token: string) => {
  const response = await fetch(`/api/user/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  const data = await response.json();
  return data;
}
