import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const formUrl = import.meta.env.VITE_GFORM_LINK

        try {
        const response = await fetch(formUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(req.body as Record<string, string>).toString(),
        });

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        return res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error submitting form", error });
    }
}
