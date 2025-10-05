// askAI.js
export async function askAI(prompt) {
  try {
    const response = await fetch("http://localhost:5000/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (err) {
    console.error("askAI error:", err);
    throw err;
  }
}
