from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Deleting old data...'))
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='Marvel', universe='Marvel')
        dc = Team.objects.create(name='DC', universe='DC')

        self.stdout.write(self.style.SUCCESS('Creating users...'))
        users = [
            User.objects.create(email='ironman@marvel.com', name='Iron Man', team=marvel),
            User.objects.create(email='spiderman@marvel.com', name='Spider-Man', team=marvel),
            User.objects.create(email='captainamerica@marvel.com', name='Captain America', team=marvel),
            User.objects.create(email='batman@dc.com', name='Batman', team=dc),
            User.objects.create(email='superman@dc.com', name='Superman', team=dc),
            User.objects.create(email='wonderwoman@dc.com', name='Wonder Woman', team=dc),
        ]

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        for user in users:
            Activity.objects.create(user=user, type='run', duration=30, date=timezone.now().date())
            Activity.objects.create(user=user, type='swim', duration=20, date=timezone.now().date())

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        w1 = Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='Easy')
        w2 = Workout.objects.create(name='Situps', description='Do 30 situps', difficulty='Medium')
        w3 = Workout.objects.create(name='Squats', description='Do 40 squats', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
        for i, user in enumerate(users):
            Leaderboard.objects.create(user=user, score=100-i*10, rank=i+1)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
