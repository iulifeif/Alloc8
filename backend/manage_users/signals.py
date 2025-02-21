from django.dispatch import receiver
from django.db.models.signals import m2m_changed, post_delete
from .models import User, Skill, Goal


@receiver(m2m_changed, sender=User.skills.through)
def cleanup_skills(sender, instance, action, **kwargs):
    if action == 'post_remove':
        for skill in Skill.objects.all():
            if not skill.users.count():
                skill.delete()


@receiver(m2m_changed, sender=User.goals.through)
def cleanup_goals(sender, instance, action, **kwargs):
    if action == 'post_remove':
        for goal in Goal.objects.all():
            if not goal.users.count():
                goal.delete()


@receiver(post_delete, sender=User)
def cleanup_user_related_data(sender, instance, **kwargs):
    instance.projects.clear()

    for skill in instance.skills.all():
        if not skill.users.count():
            skill.delete()

    for goal in instance.goals.all():
        if not goal.users.count():
            goal.delete()
