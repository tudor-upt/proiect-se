from django.http import JsonResponse

from backend.collecting_facts import *


def unique_colors(request):
    data = json.loads(get_unique_colors("Laptop"))
    return JsonResponse(data, safe=False)

def unique_ram_memory(request):
    data = json.loads(get_unique_RAM_memory("Laptop"))
    return JsonResponse(data, safe=False)

def unique_ram_memory_size(request):
    data = json.loads(get_unique_RAM_memory_size("Laptop"))
    return JsonResponse(data, safe=False)

def unique_ram_memory_type(request):
    data = json.loads(get_unique_RAM_memory_type("Laptop"))
    return JsonResponse(data, safe=False)

def unique_materials(request):
    data = json.loads(get_unique_materials("Laptop"))
    return JsonResponse(data, safe=False)

def unique_operating_system(request):
    data = json.loads(get_unique_operating_system("Laptop"))
    return JsonResponse(data, safe=False)

def unique_storage_size(request):
    data = json.loads(get_unique_storage_size("Laptop"))
    return JsonResponse(data, safe=False)

def unique_display_size(request):
    data = json.loads(get_unique_display_size("Laptop"))
    return JsonResponse(data, safe=False)

def unique_display_type(request):
    data = json.loads(get_unique_display_type("Laptop"))
    return JsonResponse(data, safe=False)

def unique_resolutions(request):
    data = json.loads(get_unique_resolutions("Laptop"))
    return JsonResponse(data, safe=False)

def unique_weights(request):
    data = json.loads(get_unique_weights("Laptop"))
    return JsonResponse(data, safe=False)

def unique_prices(request):
    data = json.loads(get_unique_prices("Laptop"))
    return JsonResponse(data, safe=False)

def unique_battery_capacities(request):
    data = json.loads(get_unique_battery_capacities("Laptop"))
    return JsonResponse(data, safe=False)

def unique_battery_lives(request):
    data = json.loads(get_unique_battery_lives("Laptop"))
    return JsonResponse(data, safe=False)

def unique_battery_type(request):
    data = json.loads(get_unique_battery_type("Laptop"))
    return JsonResponse(data, safe=False)

def unique_ports(request):
    data = json.loads(get_unique_ports("Laptop"))
    return JsonResponse(data, safe=False)

def unique_cpu_producers(request):
    data = json.loads(get_unique_cpu_producers("CPU"))
    return JsonResponse(data, safe=False)

def unique_cpu_models(request, producer):
    data = json.loads(get_unique_cpu_models("CPU", producer))
    return JsonResponse(data, safe=False)

def unique_cpu_core_count(request):
    data = json.loads(get_unique_cpu_core_count("CPU"))
    return JsonResponse(data, safe=False)

def unique_cpu_base_speeds(request):
    data = json.loads(get_unique_cpu_base_speeds("CPU"))
    return JsonResponse(data, safe=False)

def unique_gpu_producers(request):
    data = json.loads(get_unique_gpu_producers("GPU"))
    return JsonResponse(data, safe=False)

def unique_gpu_models(request, producer):
    data = json.loads(get_unique_gpu_models("GPU", producer))
    return JsonResponse(data, safe=False)

def unique_gpu_memory(request):
    data = json.loads(get_unique_gpu_memory("GPU"))
    return JsonResponse(data, safe=False)