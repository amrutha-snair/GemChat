const { GoogleGenerativeAI } = require("@google/generative-ai");

class Agent {
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY is missing in .env");
        }
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    }

    async chat(message, image) {
        try {
            if (!process.env.GEMINI_API_KEY) {
                return "GEMINI_API_KEY is missing. Please check your .env file.";
            }

            let prompt = message || "Describe this image";
            let parts = [{ text: prompt }];

            if (image) {
                // Remove header if present (e.g., "data:image/png;base64,")
                const base64Data = image.split(',')[1] || image;
                // Determine mime type or default to png needed by API
                let mimeType = "image/png";
                if (image.includes(":") && image.includes(";")) {
                    mimeType = image.substring(image.indexOf(':') + 1, image.indexOf(';'));
                }

                console.log(`Processing image. MimeType: ${mimeType}, Base64 Length: ${base64Data.length}`);

                parts.push({
                    inlineData: {
                        data: base64Data,
                        mimeType: mimeType
                    }
                });
            }

            const result = await this.model.generateContent(parts);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Error in Gemini chat:", error);
            throw error;
        }
    }
}

module.exports = { Agent };
