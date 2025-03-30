import json

import webcolors
from pymongo import MongoClient

connection_string = "mongodb+srv://viktorungur02:5RQBhm7qmuEF8kZU@cluster0.axlsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
db_name = "Project_SE"

# function for getting all unique colors and their HEX code
def get_unique_colors(collection_name):
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]

    unique_colors = set()

    for document in collection.find({}, {"colors": 1, "_id": 0}):
        colors = document.get("colors", [])
        for color in colors:
            unique_colors.add(color.strip())


    colors_list = []
    for color in sorted(unique_colors):
        try:
            hex_code = webcolors.name_to_hex(color.lower())
        except ValueError:
            hex_code = None
        colors_list.append({"name": color, "hex": hex_code})

    result_json = {"colors": colors_list}
    return json.dumps(result_json, indent=4)

# function for getting all uniques RAM memory sizes
def get_unique_RAM_memory(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_RAM_memory_sizes = set() 

    for laptop in collection.find({}, {"memory_size": 1, "_id": 0}):  
        RAM_size = laptop.get("memory_size")
        unique_RAM_memory_sizes.add(RAM_size) 

    unique_RAM_memory_sizes = sorted(unique_RAM_memory_sizes)
    RAM_size_json = json.dumps({"RAM_size": sorted(unique_RAM_memory_sizes)}, indent=4)
    
    return RAM_size_json

# function for getting all unique RAM speed
def get_unique_RAM_memory_size(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_RAM_memory_sizes = set() 

    for laptop in collection.find({}, {"memory_size": 1, "_id": 0}):  
        RAM_size = laptop.get("memory_size")
        unique_RAM_memory_sizes.add(RAM_size) 

    unique_RAM_memory_sizes = sorted(unique_RAM_memory_sizes)
    RAM_size_json = json.dumps({"RAM_size": sorted(unique_RAM_memory_sizes)}, indent=4)
    
    return RAM_size_json

# function for getting all unique RAM types
def get_unique_RAM_memory_type(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_RAM_memory_types = set() 

    for laptop in collection.find({}, {"memory_type": 1, "_id": 0}):  
        RAM_type = laptop.get("memory_type")
        unique_RAM_memory_types.add(RAM_type) 

    unique_RAM_memory_types = sorted(unique_RAM_memory_types)
    RAM_type_json = json.dumps({"RAM_type": sorted(unique_RAM_memory_types)}, indent=4)
    
    return RAM_type_json


# function for getting all unique materials
def get_unique_materials(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_materials = set()

    for laptop in collection.find({}, {"materials": 1, "_id": 0}):
        materials = laptop.get("materials", [])
        unique_materials.update(materials)  

    materials_json = json.dumps({"materials": sorted(unique_materials)}, indent=4)
    
    return materials_json

# fnction for getting all unique operating system
def get_unique_operating_system(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_os = set() 

    for laptop in collection.find({}, {"operating_system": 1, "_id": 0}):  
        os = laptop.get("operating_system")
        unique_os.add(os) 

    unique_os = sorted(unique_os)
    os_json = json.dumps({"operating_system": sorted(unique_os)}, indent=4)
    
    return os_json


# fuction for getting all unique storage capacity
def get_unique_storage_size(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_storage_sizes = set() 

    for laptop in collection.find({}, {"total_storage": 1, "_id": 0}):  
        storage_size = laptop.get("total_storage")
        unique_storage_sizes.add(storage_size) 

    unique_storage_sizes = sorted(unique_storage_sizes)
    storage_size_json = json.dumps({"storage_size": sorted(unique_storage_sizes)}, indent=4)
    
    return storage_size_json


# function for getting all uniques display sizes
def get_unique_display_size(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_display_sizes = set() 

    for laptop in collection.find({}, {"display_size": 1, "_id": 0}):  
        display_size = laptop.get("display_size")
        unique_display_sizes.add(display_size) 

    unique_display_sizes = sorted(unique_display_sizes)
    dispaly_size_json = json.dumps({"display_size": sorted(unique_display_sizes)}, indent=4)
    
    return dispaly_size_json


# function for getting all unique dislay types
def get_unique_display_type(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_display_types = set() 

    for laptop in collection.find({}, {"display_type": 1, "_id": 0}):  
        display_type = laptop.get("display_type")
        unique_display_types.add(display_type) 

    unique_display_types = sorted(unique_display_types)
    dispaly_type_json = json.dumps({"display_type": sorted(unique_display_types)}, indent=4)
    
    return dispaly_type_json


# function for getting all display resolution pairs
def get_unique_resolutions(collection_name):

    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_pairs = set()
    
    for doc in collection.find({}, {"display_horizontal_resolution": 1, "display_vertical_resolution": 1, "_id": 0}):
        h = doc.get("display_horizontal_resolution")
        v = doc.get("display_vertical_resolution")
        unique_pairs.add((h, v))
    
    resolutions_list = [{"horizontal": h, "vertical": v} for h, v in sorted(unique_pairs)]
    return json.dumps({"resolutions": resolutions_list}, indent=4)


# function for getting all weights and min/max
def get_unique_weights(collection_name):

    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_weights = set()
    
    for doc in collection.find({}, {"weight": 1, "_id": 0}):
        weight = doc.get("weight")
        unique_weights.add(float(weight))

    sorted_weights = sorted(unique_weights)
    min_weight = sorted_weights[0] if sorted_weights else None
    max_weight = sorted_weights[-1] if sorted_weights else None
    
    result = {
        "weights": sorted_weights,
        "min": min_weight,
        "max": max_weight
    }
    
    return json.dumps(result, indent=4)


# function for getting all prices and min/max
def get_unique_prices(collection_name):

    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_prices = set()
    
    for doc in collection.find({}, {"price": 1, "_id": 0}):
        price = doc.get("price")
        unique_prices.add(float(price))

    sorted_prices = sorted(unique_prices)
    min_price = sorted_prices[0] if sorted_prices else None
    max_price = sorted_prices[-1] if sorted_prices else None
    
    result = {
        "prices": sorted_prices,
        "min": min_price,
        "max": max_price
    }
    
    return json.dumps(result, indent=4)


# function for getting all battery capacity min/max
def get_unique_battery_capacities(collection_name):

    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_battery_capacities = set()
    
    for doc in collection.find({}, {"battery_capacity": 1, "_id": 0}):
        battery_capacity = doc.get("battery_capacity")
        unique_battery_capacities.add(float(battery_capacity))

    sorted_battery_capacities = sorted(unique_battery_capacities)
    min_battery_capacity = sorted_battery_capacities[0] if sorted_battery_capacities else None
    max_battery_capacity = sorted_battery_capacities[-1] if sorted_battery_capacities else None
    
    result = {
        "battery_capacities": sorted_battery_capacities,
        "min": min_battery_capacity,
        "max": max_battery_capacity
    }
    
    return json.dumps(result, indent=4)

# function for getting all unique battery life min/max
def get_unique_battery_lives(collection_name):

    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_battery_lives = set()
    
    for doc in collection.find({}, {"battery_life": 1, "_id": 0}):
        battery_life = doc.get("battery_life")
        unique_battery_lives.add(float(battery_life))

    sorted_battery_lives = sorted(unique_battery_lives)
    min_battery_life = sorted_battery_lives[0] if sorted_battery_lives else None
    max_battery_life = sorted_battery_lives[-1] if sorted_battery_lives else None
    
    result = {
        "battery_lives": sorted_battery_lives,
        "min": min_battery_life,
        "max": max_battery_life
    }
    
    return json.dumps(result, indent=4)

# function for getting all unique battery types
def get_unique_battery_type(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_battery_types = set() 

    for laptop in collection.find({}, {"battery_type": 1, "_id": 0}):  
        battery_type = laptop.get("battery_type")
        unique_battery_types.add(battery_type) 

    unique_battery_types = sorted(unique_battery_types)
    battery_type_json = json.dumps({"battery_type": sorted(unique_battery_types)}, indent=4)
    
    return battery_type_json


# function for getting all unique ports
def get_unique_ports(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_ports = set()

    for laptop in collection.find({}, {"ports": 1, "_id": 0}):
        ports = laptop.get("ports", [])
        unique_ports.update(ports)  

    ports_json = json.dumps({"ports": sorted(unique_ports)}, indent=4)
    
    return ports_json

# function for getting all unique cpus producer
def get_unique_cpu_producers(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_cpu_producers = set() 

    for laptop in collection.find({}, {"prod": 1, "_id": 0}):  
        prod = laptop.get("prod")
        unique_cpu_producers.add(prod) 

    unique_cpu_producers = sorted(unique_cpu_producers)
    cpu_producers_json = json.dumps({"cpu_producer": sorted(unique_cpu_producers)}, indent=4)
    
    return cpu_producers_json

# function for getting all unique cpu models based on producer
def get_unique_cpu_models(collection_name, producer):

    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_cpu_models = set()
    
    for doc in collection.find({"prod": producer}, {"model": 1, "_id": 0}):
        model = doc.get("model")
        unique_cpu_models.add(model)
    
    sorted_cpu_models = sorted(unique_cpu_models)
    cpu_models_json = json.dumps({"cpu_models": sorted_cpu_models}, indent=4)
    
    return cpu_models_json

# function for getting all unique core counts
def get_unique_cpu_core_count(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_core_count = set() 

    for laptop in collection.find({}, {"cores": 1, "_id": 0}):  
        cores = laptop.get("cores")
        unique_core_count.add(cores) 

    unique_core_count = sorted(unique_core_count)
    core_count_json = json.dumps({"cores": sorted(unique_core_count)}, indent=4)
    
    return core_count_json

# function for getting all unique base speeds
def get_unique_cpu_base_speeds(collection_name):

    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_cpu_base_speeds = set()
    
    for doc in collection.find({}, {"base_speed": 1, "_id": 0}):
        base_speed = doc.get("base_speed")
        unique_cpu_base_speeds.add(float(base_speed))

    sorted_unique_cpu_base_speeds = sorted(unique_cpu_base_speeds)
    min_base_speed = sorted_unique_cpu_base_speeds[0] if sorted_unique_cpu_base_speeds else None
    max_base_speed = sorted_unique_cpu_base_speeds[-1] if sorted_unique_cpu_base_speeds else None
    
    result = {
        "cpu_base_speeds": sorted_unique_cpu_base_speeds,
        "min": min_base_speed,
        "max": max_base_speed
    }
    
    return json.dumps(result, indent=4)

# function for getting all unique gpus producer
def get_unique_gpu_producers(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_gpu_producers = set() 

    for laptop in collection.find({}, {"prod": 1, "_id": 0}):  
        prod = laptop.get("prod")
        unique_gpu_producers.add(prod) 

    unique_gpu_producers = sorted(unique_gpu_producers)
    gpu_producers_json = json.dumps({"gpu_producer": sorted(unique_gpu_producers)}, indent=4)
    
    return gpu_producers_json

# function for getting all unique gpu models based on producer
def get_unique_gpu_models(collection_name, producer):

    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_gpu_models = set()
    
    for doc in collection.find({"prod": producer}, {"model": 1, "_id": 0}):
        model = doc.get("model")
        unique_gpu_models.add(model)
    
    sorted_gpu_models = sorted(unique_gpu_models)
    gpu_models_json = json.dumps({"gpu_models": sorted_gpu_models}, indent=4)
    
    return gpu_models_json

# function for getting all gpu memory sizes
def get_unique_gpu_memory(collection_name):
    
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    
    unique_gpu_memory = set() 

    for laptop in collection.find({}, {"memory_size": 1, "_id": 0}):  
        memory_size = laptop.get("memory_size")
        unique_gpu_memory.add(memory_size) 

    unique_gpu_memory = sorted(unique_gpu_memory)
    gpu_memory_json = json.dumps({"gpu_memory_size": sorted(unique_gpu_memory)}, indent=4)
    
    return gpu_memory_json

if __name__ == "__main__":
    
    colors_json = get_unique_gpu_memory("GPU")
    print(colors_json)

    print("Done!")