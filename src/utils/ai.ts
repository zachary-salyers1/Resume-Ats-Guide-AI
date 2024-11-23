import Groq from 'groq-sdk';
import { AnalysisResult } from "../types";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeResume(resume: string, jobDescription: string): Promise<AnalysisResult> {
  if (!resume || !jobDescription) {
    throw new Error("Resume and job description are required");
  }

  try {
    const prompt = `You are an expert ATS and resume analyzer. Analyze this resume against the job description and provide structured feedback.
    
Resume:
${resume}

Job Description:
${jobDescription}

Provide a detailed analysis with:
1. A match score (0-100) based on how well the resume matches the job requirements
2. Key matching skills found in both the resume and job description
3. Important skills mentioned in the job description but missing from the resume
4. Specific suggestions for improvement

Return ONLY a valid JSON object with this exact structure:
{
  "matchScore": number,
  "keySkills": string[],
  "missingSkills": string[],
  "suggestions": [
    {
      "category": "Skills" | "Experience" | "Education" | "Format",
      "recommendation": string,
      "priority": "High" | "Medium" | "Low"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert ATS and resume analyzer. Always respond with valid JSON matching the specified structure."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.3,
      max_tokens: 2048,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response received from the analysis service");
    }

    try {
      const parsedResponse = JSON.parse(response) as AnalysisResult;
      
      // Validate the response structure
      if (
        typeof parsedResponse.matchScore !== 'number' ||
        !Array.isArray(parsedResponse.keySkills) ||
        !Array.isArray(parsedResponse.missingSkills) ||
        !Array.isArray(parsedResponse.suggestions)
      ) {
        throw new Error("Invalid response format from analysis service");
      }

      return parsedResponse;
    } catch (parseError) {
      console.error("Parse error:", parseError);
      throw new Error("Failed to parse analysis results. Please try again.");
    }
  } catch (error) {
    console.error("AI Analysis Error:", error);
    if (error instanceof Error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
    throw new Error("Failed to analyze resume. Please try again.");
  }
}