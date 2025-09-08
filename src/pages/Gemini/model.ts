import { GoogleGenerativeAI } from "@google/generative-ai";
const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBHapB4komQgHmgeyTEzu9Jn7Qptj47T3M";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export default model;
