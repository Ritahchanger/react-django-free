from django.urls import path


from .views import SignupView,LoginView,AcceptJobView,AvailableJobsView,JobPostView, WorkerJobsView


urlpatterns = [

    path('auth/signup',SignupView.as_view(), name='signup'),

    path('auth/login', LoginView.as_view(), name='login'),

    path('jobs/post', JobPostView.as_view(), name='job-post'),

    path('jobs',AvailableJobsView.as_view(), name='available-jobs'),

    path('jobs/accept/<int:job_id>',AcceptJobView.as_view(),name='accept-job'),

    path('jobs/worker/<int:worker_id>',WorkerJobsView.as_view(),name='worker-job'),



]