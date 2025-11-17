import express from 'express';
import { analyzeStudent, analyzeClass, suggestImprovements } from '../services/aiService.js';

const router = express.Router();

// POST /api/analyze-student
router.post('/analyze-student', async (req, res) => {
  try {
    const { name, subjects, teacherComments, strengths } = req.body;

    if (!name || !subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({
        error: 'Invalid request. Required: name, subjects (array with name, marks, totalMarks)'
      });
    }

    const analysis = await analyzeStudent(req.body);
    
    res.json({
      success: true,
      studentName: name,
      analysis
    });
  } catch (error) {
    console.error('Error in /analyze-student:', error);
    res.status(500).json({
      error: 'Failed to analyze student',
      message: error.message
    });
  }
});

// POST /api/analyze-class
router.post('/analyze-class', async (req, res) => {
  try {
    const { className, students, subject } = req.body;

    if (!className || !students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({
        error: 'Invalid request. Required: className, students (array), subject'
      });
    }

    const analysis = await analyzeClass(req.body);
    
    res.json({
      success: true,
      className,
      subject: subject || 'overall',
      analysis
    });
  } catch (error) {
    console.error('Error in /analyze-class:', error);
    res.status(500).json({
      error: 'Failed to analyze class',
      message: error.message
    });
  }
});

// POST /api/suggest-improvements
router.post('/suggest-improvements', async (req, res) => {
  try {
    const { studentName, currentPerformance, weaknesses, goals } = req.body;

    if (!studentName || !currentPerformance || !weaknesses || !Array.isArray(weaknesses)) {
      return res.status(400).json({
        error: 'Invalid request. Required: studentName, currentPerformance, weaknesses (array)'
      });
    }

    const suggestions = await suggestImprovements(req.body);
    
    res.json({
      success: true,
      studentName,
      suggestions
    });
  } catch (error) {
    console.error('Error in /suggest-improvements:', error);
    res.status(500).json({
      error: 'Failed to generate improvement suggestions',
      message: error.message
    });
  }
});

export default router;
