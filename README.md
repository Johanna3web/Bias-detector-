# Student Management System - AI Backend

AI-powered API for analyzing student performance and generating improvement suggestions using Google Gemini AI.

## Features

- **Student Analysis**: Analyze individual student performance across subjects.
- **Class Analysis**: Evaluate overall class performance and identify trends
- **Improvement Suggestions**: Generate personalized improvement plans

## Setup

### 1. Get Google AI API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

### 4. Start Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. POST /analyze-student

Analyzes individual student performance.

**Request Body:**
```json
{
  "name": "John Doe",
  "subjects": [
    {
      "name": "Mathematics",
      "marks": 85,
      "totalMarks": 100
    },
    {
      "name": "Science",
      "marks": 72,
      "totalMarks": 100
    },
    {
      "name": "English",
      "marks": 90,
      "totalMarks": 100
    }
  ],
  "teacherComments": "Good participation in class, needs to focus more on Science",
  "strengths": "Strong in problem-solving and creative writing"
}
```

**Response:**
```json
{
  "success": true,
  "studentName": "John Doe",
  "analysis": {
    "overallPerformance": "...",
    "averageScore": "82.3%",
    "performanceLevel": "Good",
    "strengths": ["..."],
    "weaknesses": ["..."],
    "subjectAnalysis": [...],
    "improvementPlan": {...},
    "motivationalMessage": "..."
  }
}
```

### 2. POST /analyze-class

Analyzes overall class performance.

**Request Body:**
```json
{
  "className": "Grade 10A",
  "subject": "Mathematics",
  "students": [
    {
      "name": "John Doe",
      "subjects": [
        {
          "name": "Mathematics",
          "marks": 85,
          "totalMarks": 100
        }
      ]
    },
    {
      "name": "Jane Smith",
      "subjects": [
        {
          "name": "Mathematics",
          "marks": 92,
          "totalMarks": 100
        }
      ]
    }
  ]
}
```

For overall analysis across all subjects, use `"subject": "overall"`.

**Response:**
```json
{
  "success": true,
  "className": "Grade 10A",
  "subject": "Mathematics",
  "analysis": {
    "classOverview": "...",
    "statistics": {
      "averageScore": "88.5%",
      "highestScore": "92",
      "lowestScore": "85",
      "passingRate": "100%",
      "distribution": {...}
    },
    "topPerformers": [...],
    "studentsNeedingSupport": [...],
    "classStrengths": [...],
    "classWeaknesses": [...],
    "teachingRecommendations": [...],
    "interventionStrategies": [...]
  }
}
```

### 3. POST /suggest-improvements

Generates personalized improvement plan.

**Request Body:**
```json
{
  "studentName": "John Doe",
  "currentPerformance": "Average",
  "weaknesses": [
    "Time management",
    "Science concepts understanding",
    "Test anxiety"
  ],
  "goals": "Improve Science grade to 80% and develop better study habits"
}
```

**Response:**
```json
{
  "success": true,
  "studentName": "John Doe",
  "suggestions": {
    "personalizedPlan": {
      "weeklySchedule": [...],
      "dailyRoutine": {...}
    },
    "subjectSpecificStrategies": [...],
    "studyTips": [...],
    "timeManagement": {...},
    "progressTracking": {...},
    "supportResources": [...],
    "motivationalQuote": "..."
  }
}
```

## Testing with Postman

### Import Collection

1. Open Postman
2. Create a new collection: "Student Management AI"
3. Add the three endpoints above

### Test Requests

**Test 1: Analyze Student**
- Method: POST
- URL: `http://localhost:3000/api/analyze-student`
- Headers: `Content-Type: application/json`
- Body: Use the example from endpoint 1

**Test 2: Analyze Class**
- Method: POST
- URL: `http://localhost:3000/api/analyze-class`
- Headers: `Content-Type: application/json`
- Body: Use the example from endpoint 2

**Test 3: Suggest Improvements**
- Method: POST
- URL: `http://localhost:3000/api/suggest-improvements`
- Headers: `Content-Type: application/json`
- Body: Use the example from endpoint 3

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (invalid input)
- `500`: Server Error (AI processing failed)

Error response format:
```json
{
  "error": "Error description",
  "message": "Detailed error message"
}
```

## Integration with Frontend

### CORS Configuration

The API has CORS enabled for all origins. For production, update `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

### Example Frontend Integration

```javascript
// Analyze a student
const analyzeStudent = async (studentData) => {
  const response = await fetch('http://localhost:3000/api/analyze-student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentData)
  });
  
  return await response.json();
};

// Usage
const result = await analyzeStudent({
  name: "John Doe",
  subjects: [
    { name: "Math", marks: 85, totalMarks: 100 }
  ],
  teacherComments: "Good student",
  strengths: "Problem solving"
});

console.log(result.analysis);
```

## Deployment

### Deploy to Google Cloud Functions

1. Install Google Cloud CLI
2. Create a Cloud Function:

```bash
gcloud functions deploy studentManagementAI \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point app \
  --set-env-vars GEMINI_API_KEY=your_key
```

### Deploy to Vercel/Netlify

The API can be deployed as serverless functions. See respective platform documentation.

## Project Structure

```
├── config/
│   └── gemini.js          # Gemini AI configuration
├── prompts/
│   ├── studentAnalysis.js # Student analysis prompt template
│   ├── classAnalysis.js   # Class analysis prompt template
│   └── improvementSuggestions.js # Improvement suggestions template
├── routes/
│   └── aiRoutes.js        # API route handlers
├── services/
│   └── aiService.js       # AI service logic
├── server.js              # Express server setup
├── package.json
├── .env.example
└── README.md
```

## Troubleshooting

### API Key Issues
- Verify your API key is correct in `.env`
- Check API key has proper permissions in Google AI Studio
- Ensure no extra spaces in the `.env` file

### JSON Parsing Errors
- The AI sometimes returns markdown-formatted JSON
- The service automatically extracts JSON from the response
- If issues persist, check the console logs for raw AI responses

### Rate Limiting
- Google AI has rate limits on free tier
- Implement request queuing if needed
- Consider upgrading to paid tier for production

## Support

For issues or questions, contact the development team.
