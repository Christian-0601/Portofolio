for file in src/App.tsx src/pages/*.tsx; do
  sed -i 's/-\[#00FF00\]/-accent/g' "$file"
  sed -i 's/-\[#00cc00\]/-accent-hover/g' "$file"
  sed -i 's/-\[#0a0a0a\]/-bg-main/g' "$file"
  sed -i 's/-\[#0d0d0d\]/-bg-card/g' "$file"
  sed -i 's/-\[#1a1a1a\]/-border-main/g' "$file"
  sed -i 's/-\[#111\]/-bg-muted/g' "$file"
  sed -i 's/-\[#333\]/-border-hover/g' "$file"
done
