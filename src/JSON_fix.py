import json

# Load data from stats.json
with open('stats.json', 'r') as file:
    json_data = json.load(file)

# Changing "Player" to "player" for each entry
for entry in json_data:
    entry["Player"] = entry.pop("\u00ef\u00bb\u00bfPlayer")

# Write the modified data to stats2.json
with open('stats2.json', 'w') as file:
    json.dump(json_data, file, indent=2)

print("Data has been loaded from stats.json and written to stats2.json with the key change.")
