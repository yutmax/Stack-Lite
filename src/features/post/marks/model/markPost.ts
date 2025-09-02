export const markPost = async (id: number, mark: "like" | "dislike" | "none") => {
  try {
    const res = await fetch(`/api/snippets/${id}/mark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ mark }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || `HTTP error ${res.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
