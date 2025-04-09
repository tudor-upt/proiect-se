from django.http import JsonResponse

import interogating_db
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


def get_filtered_laptops(request):
    query_params = dict(request.GET)

    filter_criteria = {}

    for key, values in query_params.items():
        if values and len(values) > 0:
            if len(values) > 1:
                filter_criteria[key] = values
            else:
                filter_criteria[key] = values[0]
            compound_value = filter_criteria[key].split(",")
            filter_criteria[key] = [value.removesuffix(" HTTP/1.1") for value in compound_value]


    print(json.dumps(filter_criteria, default=str, indent=4))

    return JsonResponse(
        data=filter_laptops(interogating_db.get_all_laptops(), filter_criteria),
        safe=False)

def filter_laptops(laptops, criteria):
    filtered_laptops = []
    for laptop in laptops:
        valid = True
        for criteria_name, criteria_values in criteria.items():
            laptop_specs = laptop.get(criteria_name)

            if criteria_name == "price":
                min_price, max_price = criteria_values[0].split("-")
                laptop_specs = int(laptop_specs)
                valid = int(min_price) <= laptop_specs <= int(max_price)
                continue

            if criteria_name.startswith("cpu/"):
                criteria_name = criteria_name.split("/")[1]
                laptop_specs = laptop.get("cpu").get(criteria_name)
            elif criteria_name.startswith("gpu/"):
                criteria_name = criteria_name.split("/")[1]
                laptop_specs = laptop.get("gpu").get(criteria_name)

            if not laptop_specs:
                valid = False
                continue

            if isinstance(laptop_specs, list):
                match = any(str(value) in laptop_specs for value in criteria_values)
            else:
                match = any(str(laptop_specs) == str(value) for value in criteria_values)
            if not match:
                valid = False
        if valid:
            filtered_laptops.append(laptop)
    return filtered_laptops

