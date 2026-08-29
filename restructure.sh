#!/bin/bash

# Move existing pages
mv src/pages/About.tsx src/pages/public/
mv src/pages/Certificates.tsx src/pages/public/
mv src/pages/Contact.tsx src/pages/public/
mv src/pages/Journey.tsx src/pages/public/
mv src/pages/Projects.tsx src/pages/public/
mv src/pages/Skills.tsx src/pages/public/

# Move admin page
mv src/pages/Admin.tsx src/pages/admin/

# Update imports in all moved files to reflect new paths
for file in src/pages/public/*.tsx src/pages/admin/*.tsx; do
  sed -i 's|from \x27../App\x27|from \x27../../components/layout/BottomBar\x27|g' "$file"
  sed -i 's|from \x27../components/AnimatedSection\x27|from \x27../../components/AnimatedSection\x27|g' "$file"
done

