export interface DeleteQuestionResult {
  success: boolean;
  error?: string;
}

export async function deleteQuestion(questionId: string | number): Promise<DeleteQuestionResult> {
  try {
    const res = await fetch(`/api/questions/${questionId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.ok) {
      return { success: true };
    }
    let msg = `Failed with status ${res.status}`;
    try {
      const json = await res.json();
      msg = json.message || msg;
    } catch {}
    return { success: false, error: msg };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Network error" };
  }
}
