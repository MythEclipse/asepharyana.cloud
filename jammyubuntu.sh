#!/bin/bash

# Buat cadangan file sources.list
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# Mengubah repositori dari focal ke jammy
sudo sed -i 's/focal/jammy/g' /etc/apt/sources.list

# Ganti dengan mirror baru
sudo bash -c 'cat <<EOF > /etc/apt/sources.list
deb http://mirror.poliwangi.ac.id/ubuntu/ jammy main restricted universe multiverse
deb http://mirror.poliwangi.ac.id/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirror.poliwangi.ac.id/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirror.poliwangi.ac.id/ubuntu/ jammy-backports main restricted universe multiverse
deb http://mirror.poliwangi.ac.id/ubuntu/ jammy-proposed main restricted universe multiverse
EOF'

# Memperbarui daftar paket
sudo apt update

# Melakukan upgrade
sudo apt upgrade -y

# Melakukan dist-upgrade
sudo apt dist-upgrade -y

# Menghapus paket yang tidak diperlukan
sudo apt autoremove -y

echo "Pembaruan sistem dari Focal ke Jammy telah selesai dan repositori telah diganti."
