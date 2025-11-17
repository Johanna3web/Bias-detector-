import { getModel } from '../config/gemini.js';
import { studentAnalysisPrompt } from '../prompts/studentAnalysis.js';
import { classAnalysisPrompt } from '../prompts/classAnalysis.js';
import { improvementSuggestionsPrompt } from '../prompts/improvementSuggestions.js';

export const analyzeStudent = async (studentData) => {
  try {
    const model = getModel();
    const prompt = studentAnalysisPrompt(studentData);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Error in analyzeStudent:', error);
    throw error;
  }
};

export const analyzeClass = async (classData) => {
  try {
    const model = getModel();
    const prompt = classAnalysisPrompt(classData);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Error in analyzeClass:', error);
    throw error;
  }
};

export const suggestImprovements = async (improvementData) => {
  try {
    const model = getModel();
    const prompt = improvementSuggestionsPrompt(improvementData);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Error in suggestImprovements:', error);
    throw error;
  }
};
