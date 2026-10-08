const API_BASE_URL =
  "http://localhost:8000";


export async function analyzeWithBackend(
  payload
) {

  const response =
    await fetch(
      `${API_BASE_URL}/api/v1/analyze`,
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(payload)

      }
    );


  if (!response.ok) {

    throw new Error(
      "Backend analysis failed"
    );

  }


  return response.json();

}