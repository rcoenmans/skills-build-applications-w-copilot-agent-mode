from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Marvel', universe='Marvel')
        self.assertEqual(team.name, 'Marvel')
    def test_user_creation(self):
        team = Team.objects.create(name='DC', universe='DC')
        user = User.objects.create(email='batman@dc.com', name='Batman', team=team)
        self.assertEqual(user.email, 'batman@dc.com')
    def test_activity_creation(self):
        team = Team.objects.create(name='Marvel', universe='Marvel')
        user = User.objects.create(email='spiderman@marvel.com', name='Spiderman', team=team)
        activity = Activity.objects.create(user=user, type='run', duration=30, date='2025-10-24')
        self.assertEqual(activity.type, 'run')
    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='Easy')
        self.assertEqual(workout.name, 'Pushups')
    def test_leaderboard_creation(self):
        team = Team.objects.create(name='Marvel', universe='Marvel')
        user = User.objects.create(email='ironman@marvel.com', name='Ironman', team=team)
        leaderboard = Leaderboard.objects.create(user=user, score=100, rank=1)
        self.assertEqual(leaderboard.rank, 1)
