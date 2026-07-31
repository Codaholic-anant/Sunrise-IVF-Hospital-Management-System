const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

export function decodeJwt(token) {
  if (!token) return null;

  try {
    const [, payload] = token.split('.');
    if (!payload) return null;

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getAuthSession() {
  const token = sessionStorage.getItem('token');
  const claims = decodeJwt(token);

  if (!token || !claims) {
    return { isAuthenticated: false, token: null, claims: null, user: null };
  }

  const expiresAt = claims.exp ? claims.exp * 1000 : 0;
  if (expiresAt && Date.now() >= expiresAt) {
    clearAuthSession();
    return { isAuthenticated: false, token: null, claims: null, user: null };
  }

  const role = claims.role || claims[ROLE_CLAIM] || 'SuperAdmin';
  const isSuperAdmin = role === 'SuperAdmin' || claims.is_super_admin === 'true';

  let storedUser = {};
  try {
    storedUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  } catch {
    storedUser = {};
  }

  return {
    isAuthenticated: true,
    token,
    claims,
    user: {
      ...storedUser,
      userId: storedUser.userId || claims.sub || claims.nameid,
      username: storedUser.username || claims.unique_name || claims.name,
      role,
      isSuperAdmin,
      permissions: isSuperAdmin ? 'all' : storedUser.permissions,
    },
  };
}

export function clearAuthSession() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('currentUser');
}
