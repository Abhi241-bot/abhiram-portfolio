with open('gustavo_index.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

import re
selectors = ['.home', '.name-container', '.name-highlight', '#section-home', 'main', '.section']
for sel in selectors:
    matches = re.finditer(re.escape(sel) + r'\s*\{([^}]+)\}', css)
    print(f'=== {sel} ===')
    for m in matches:
        print(' ', m.group(1))
