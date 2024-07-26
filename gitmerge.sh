git checkout beta
git add .
git commit -m "Cari sendiri"
git push
#!/bin/bash

# Pindah ke branch master
git checkout master

# Tarik perubahan terbaru dari remote repository untuk branch master
git pull origin master

# Gabungkan branch beta ke master
if ! git merge beta; then
  echo "Merge conflict detected. Please resolve the conflicts."
  git checkout beta
  exit 1
fi

# Selesaikan konflik jika ada
echo "If you resolved conflicts, add the files and commit them."

# Commit perubahan hasil merge
git add .
git commit -m "Cari sendiri"

# Dorong perubahan ke remote repository untuk branch master
if ! git push origin master; then
  echo "Push failed. Switching back to beta."
  git checkout beta
  exit 1
fi

# Kembali ke branch beta
git checkout beta
