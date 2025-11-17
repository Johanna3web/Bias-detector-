export const studentAnalysisPrompt = (studentData) => {
  const { name, subjects, teacherComments, strengths } = studentData;
  
  const subjectDetails = subjects.map(s => 
    `${s.name}: ${s.marks}/${s.totalMarks} (${((s.marks/s.totalMarks)*100).toFixed(1)}%)`
  ).join('\n');

  return `Analyze this student's academic performance and provide detailed insights:

Student Name: ${name}

Subject Performance:
${subjectDetails}

Teacher Comments: ${teacherComments || 'None provided'}
Areas of Strength: ${strengths || 'Not specified'}

Please provide a comprehensive analysis in JSON format with the following structure:
{
  "overallPerformance": "Brief summary of overall performance",
  "averageScore": "Calculate and provide average percentage",
  "performanceLevel": "Excellent/Good/Average/Below Average/Poor",
  "strengths": ["List key strengths based on marks and comments"],
  "weaknesses": ["List areas needing improvement"],
  "subjectAnalysis": [
    {
      "subject": "subject name",
      "performance": "analysis",
      "recommendation": "specific advice"
    }
  ],
  "improvementPlan": {
    "shortTerm": ["Immediate actions for next 2-4 weeks"],
    "longTerm": ["Strategic goals for the semester"],
    "studyTechniques": ["Recommended study methods"],
    "focusAreas": ["Priority subjects/topics"]
  },
  "motivationalMessage": "Encouraging message for the student"
}`;
};
