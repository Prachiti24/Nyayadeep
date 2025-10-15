# Integration TODO: Unify Learning and Progress Tracking Across All Modules

## Backend Integration
- [ ] Unify XP tracking: Update all modules to use Progress model instead of User.xpTotal
- [ ] Update games (Crossword, WordSearch) to use Progress API for XP/streaks/badges
- [ ] Integrate quizzes: Update UserQuizAttempt to sync with Progress.completedLessons and award XP
- [ ] Add lesson completion tracking to Progress model
- [ ] Integrate Telegram bot: Track daily facts engagement, award XP for interactions
- [ ] Add chatbot interaction tracking: Award XP for meaningful conversations
- [ ] Implement daily login bonuses and streak maintenance across all modules
- [ ] Create unified progress sync utility to keep User and Progress models in sync

## Frontend Integration
- [ ] Update Crossword component to use Progress API
- [ ] Update WordSearch component to use Progress API
- [ ] Add quiz completion progress tracking
- [ ] Integrate Telegram bot progress in dashboard
- [ ] Add chatbot XP rewards display
- [ ] Create unified progress dashboard showing all activities
- [ ] Add streak maintenance on login across all components

## Testing and Verification
- [ ] Test XP consistency across all modules
- [ ] Verify streak calculations work with all activities
- [ ] Test badge awarding from games, quizzes, lessons
- [ ] Verify Telegram bot integration
- [ ] Test chatbot XP rewards
- [ ] Run full integration test with multiple activities
