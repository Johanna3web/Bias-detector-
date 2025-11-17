export const classAnalysisPrompt = (classData) => {
  const { className, students, subject } = classData;
  
  const studentSummaries = students.map(s => {
    const subjectMark = s.subjects.find(sub => sub.name === subject);
    return `${s.name}: ${subjectMark ? `${subjectMark.marks}/${subjectMark.totalMarks}` : 'N/A'}`;
  }).join('\n');

  const allSubjects = subject === 'overall' 
    ? students[0]?.subjects.map(s => s.name).join(', ') 
    : subject;

  return `Analyze the overall class performance and provide insights:

Class: ${className}
Analysis Focus: ${subject === 'overall' ? 'All Subjects' : subject}
Number of Students: ${students.length}

${subject === 'overall' ? 'Overall Student Performance:' : `${subject} Performance:`}
${studentSummaries}

Please provide a comprehensive class analysis in JSON format:
{
  "classOverview": "Summary of class performance",
  "statistics": {
    "averageScore": "Calculate class average",
    "highestScore": "Best performing score",
    "lowestScore": "Lowest score",
    "passingRate": "Percentage of students passing (>50%)",
    "distribution": {
      "excellent": "Count of students 80-100%",
      "good": "Count of students 60-79%",
      "average": "Count of students 50-59%",
      "belowAverage": "Count of students <50%"
    }
  },
  "topPerformers": ["List top 3 students"],
  "studentsNeedingSupport": ["List students scoring below 50%"],
  "classStrengths": ["What the class does well"],
  "classWeaknesses": ["Areas where class struggles"],
  "teachingRecommendations": ["Suggestions for teaching approach"],
  "interventionStrategies": ["Specific strategies for struggling students"]
}`;
};
