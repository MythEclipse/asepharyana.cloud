git checkout master
git pull origin master
git merge beta
echo Selesaikan konflik jika ada
git add .
git commit -m "Merge beta into master"
git push origin master
git checkout beta