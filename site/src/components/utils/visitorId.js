const VISITOR_KEY = "pranoVisitorId";

// Анонімний ідентифікатор браузера — щоб рахувати унікальних людей, а не відкриття
export const getVisitorId = () => {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
};
