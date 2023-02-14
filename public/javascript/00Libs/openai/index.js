async function openai_davinci(prompt) {
    if (!prompt) {
        return;
    }
    let response = await fetch(
        `https://api.openai.com/v1/completions`,
        {
            body: JSON.stringify({
                prompt,
                "model": "text-davinci-003",
                "temperature": 0,
                "max_tokens": 400
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer  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",
            },
        }
    )
    if (response.ok) {
        return (await response.json()).choices[0].text
    }
}