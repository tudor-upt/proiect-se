from django.urls import path
from api import views

urlpatterns = [
    path('colors/', views.unique_colors),
    path('memory/', views.unique_ram_memory),
    path('memory-size/', views.unique_ram_memory_size),
    path('memory-type/', views.unique_ram_memory_type),
    path('materials/', views.unique_materials),
    path('operating-system/', views.unique_operating_system),
    path('storage-size/', views.unique_storage_size),
    path('display-size/', views.unique_display_size),
    path('display-type/', views.unique_display_type),
    path('resolutions/', views.unique_resolutions),
    path('weights/', views.unique_weights),
    path('prices/', views.unique_prices),
    path('battery-capacities/', views.unique_battery_capacities),
    path('battery-lives/', views.unique_battery_lives),
    path('battery-type/', views.unique_battery_type),
    path('ports/', views.unique_ports),
    path('cpu/producers/', views.unique_cpu_producers),
    path('cpu/models/<str:producer>/', views.unique_cpu_models),
    path('cpu/cores/', views.unique_cpu_core_count),
    path('cpu/base-speeds/', views.unique_cpu_base_speeds),
    path('gpu/producers/', views.unique_gpu_producers),
    path('gpu/models/<str:producer>/', views.unique_gpu_models),
    path('gpu/memory/', views.unique_gpu_memory),
    path('laptops/', views.get_filtered_laptops),
]