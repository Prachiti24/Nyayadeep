# TODO: Unify Progress Tracking and Fix Lesson Completion Features

## Backend Changes
- [ ] Modify backend/models/Progress.js: Change completedLessons to array of objects [{lessonId: String, lastPosition: String}]
- [ ] Update backend/routes/lesson.js: Add GET /api/lessons/:lessonId endpoint, change /section/:sectionId to /part/:partId, update progress route to use Progress model for lesson progress with lastPosition
- [ ] Update backend/routes/progress.js: Add badge awarding logic (XP milestones), enhance streak logic with daily login bonus

## Frontend Changes
- [ ] Update frontend/src/components/ContinueLearning.jsx: Fetch real lessons from API, filter by completedLessons, display lastPosition
- [ ] Update frontend/src/components/LessonDetail.jsx: Fetch real lesson data, implement lastPosition saving/loading

## Testing and Verification
- [ ] Test backend APIs for lessons and progress
- [ ] Run frontend and verify components work with real data
- [ ] Handle edge cases (no progress, no lessons)
