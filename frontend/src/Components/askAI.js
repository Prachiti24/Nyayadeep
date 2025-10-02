import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";

export const askAI = async (question) => {
    const genAI = new GoogleGenerativeAI("AIzaSyDdnAbwwsqeN-aui5wyqvABK-s3wR8pDwk");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = question;
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        toast.error("Error: " + error.message);
        return "error";
    }
};