from pymongo import MongoClient
import json
from bson import ObjectId

connection_string = "mongodb+srv://viktorungur02:5RQBhm7qmuEF8kZU@cluster0.axlsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
db_name = "Project_SE"

# function for getting all data based on laptop model name
def get_laptop_details_by_model(laptop_collection_name, model_name):

    client = MongoClient(connection_string)
    db = client[db_name]
    laptop_collection = db[laptop_collection_name]
    cpu_collection = db["CPU"]
    gpu_collection = db["GPU"]
    
    laptop = laptop_collection.find_one({"name": model_name})
    if not laptop:
        return json.dumps({"error": f"No laptop found with model name: {model_name}"}, indent=4)
    
    def convert_to_objectid(value):
        if isinstance(value, ObjectId):
            return value
        if isinstance(value, dict) and "$oid" in value:
            return ObjectId(value["$oid"])
        try:
            return ObjectId(value)
        except Exception:
            return None

    cpu_id = convert_to_objectid(laptop.get("cpu_id"))
    gpu_id = convert_to_objectid(laptop.get("gpu_id"))
    
    cpu = cpu_collection.find_one({"_id": cpu_id}) if cpu_id is not None else None
    
    gpu = gpu_collection.find_one({"_id": gpu_id}) if gpu_id is not None else None

    laptop["cpu"] = cpu
    laptop["gpu"] = gpu

    laptop.pop("cpu_id", None)
    laptop.pop("gpu_id", None)
    
    return json.dumps(laptop, default=str, indent=4)


# function for getting a laptop model by a certain parameter value
def search_laptop_names(search_collection, parameter, value):
    assert search_collection in ["Laptop", "CPU", "GPU"], "search_collection must be one of 'Laptop', 'CPU', or 'GPU'."

    client = MongoClient(connection_string)
    db = client[db_name]
    laptop_collection = db["Laptop"]
    
    try:
        if isinstance(value, str) and '.' in value:
            value_converted = float(value)
        elif isinstance(value, str):
            value_converted = int(value)
        else:
            value_converted = value
    except ValueError:
        value_converted = value

    laptop_names = []

    if search_collection == "Laptop":
        cursor = laptop_collection.find({parameter: value_converted}, {"name": 1, "_id": 0})
        laptop_names = [doc["name"] for doc in cursor if "name" in doc]

    elif search_collection == "CPU":
        cpu_collection = db["CPU"]
        
        cursor = cpu_collection.find({parameter: value_converted}, {"_id": 1})
        cpu_ids = [doc["_id"] for doc in cursor]
        
        if cpu_ids:
            cursor = laptop_collection.find({"cpu_id": {"$in": cpu_ids}}, {"name": 1, "_id": 0})
            laptop_names = [doc["name"] for doc in cursor if "name" in doc]

    elif search_collection == "GPU":
        gpu_collection = db["GPU"]
        
        cursor = gpu_collection.find({parameter: value_converted}, {"_id": 1})
        gpu_ids = [doc["_id"] for doc in cursor]
        
        if gpu_ids:
            cursor = laptop_collection.find({"gpu_id": {"$in": gpu_ids}}, {"name": 1, "_id": 0})
            laptop_names = [doc["name"] for doc in cursor if "name" in doc]

    result = {"laptop_names": laptop_names}
    return json.dumps(result, default=str, indent=4)

# function for returning laptop model by range parameters
def search_laptops_by_range(parameter_type, min_val, max_val):
   
    allowed = ["base_speed", "battery_life", "battery_capacity", "price", "weight"]
    assert parameter_type in allowed, f"Parameter type must be one of {allowed}."
    
    client = MongoClient(connection_string)
    db = client[db_name]
    laptop_collection = db["Laptop"]

    laptop_names = []
    
    if parameter_type == "base_speed":
        cpu_collection = db["CPU"]
        cpu_cursor = cpu_collection.find(
            {"base_speed": {"$gte": min_val, "$lte": max_val}},
            {"_id": 1}
        )
        cpu_ids = [doc["_id"] for doc in cpu_cursor]
        if cpu_ids:
            cursor = laptop_collection.find(
                {"cpu_id": {"$in": cpu_ids}},
                {"name": 1, "_id": 0}
            )
            laptop_names = [doc["name"] for doc in cursor if "name" in doc]
    else:
        cursor = laptop_collection.find(
            {parameter_type: {"$gte": min_val, "$lte": max_val}},
            {"name": 1, "_id": 0}
        )
        laptop_names = [doc["name"] for doc in cursor if "name" in doc]
    
    result = {"laptop_names": laptop_names}
    return json.dumps(result, default=str, indent=4)

# function which combines multiple parameters

if __name__ == "__main__":
    
    colors_json = search_laptops_by_range("base_speed", 2.42, 3.7)
    
    with open("data_by_range_parameter.json", "a", encoding="utf-8") as file:
        file.write(colors_json)

    print("Done!")