import urllib.request
import os
import re

base_url = "https://gustavobatista.dev/"

with open('gustavo_index.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

# Find all asset paths mentioned in js
matches = re.findall(r'["\'](models/[^"\']+|images/[^"\']+|videos/[^"\']+|sound/[^"\']+|assets/[^"\']+)["\']', js)
assets = sorted(list(set(matches)))

print(f"Found {len(assets)} assets:")
for a in assets:
    print(a)

for a in assets:
    target_path = os.path.join("public", a)
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    full_url = base_url + a
    try:
        urllib.request.urlretrieve(full_url, target_path)
        print(f"Downloaded: {a} -> {os.path.getsize(target_path)} bytes")
    except Exception as e:
        print(f"Failed {a}: {e}")
