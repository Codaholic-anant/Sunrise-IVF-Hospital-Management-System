export const genId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
