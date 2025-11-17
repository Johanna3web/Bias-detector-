export const improvementSuggestionsPrompt = (data) => {
  const { studentName, currentPerformance, weaknesses, goals } = data;

  return `Create a personalized improvement plan for a student:

Student: ${studentName}
Current Performance Level: ${currentPerformance}
Identified Weaknesses: ${weaknesses.join(', ')}
Goals: ${goals || 'Improve overall academic performance'}

Generate a detailed, actionable improvement plan in JSON format:
{
  "personalizedPlan": {
    "weeklySchedule": [
      {
        "day": "Monday",
        "activities": ["Specific study activities"],
        "duration": "Recommended time"
      }
    ],
    "dailyRoutine": {
      "morning": ["Activities before school"],
      "afterSchool": ["Study activities"],
      "evening": ["Review and preparation"]
    }
  },
  "subjectSpecificStrategies": [
    {
      "subject": "subject name",
      "techniques": ["Specific learning techniques"],
      "resources": ["Recommended resources"],
      "practiceActivities": ["Exercises to do"]
    }
  ],
  "studyTips": ["General effective study tips"],
  "timeManagement": {
    "priorities": ["What to focus on first"],
    "breakSchedule": "Recommended break pattern",
    "weeklyGoals": ["Achievable weekly targets"]
  },
  "progressTracking": {
    "milestones": ["Checkpoints to measure progress"],
    "selfAssessment": ["Questions to ask yourself weekly"]
  },
  "supportResources": ["Additional help available"],
  "motivationalQuote": "Inspiring message"
}`;
};
