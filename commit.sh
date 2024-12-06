#!/bin/bash

# Jalankan npm format
npm run format || {
    echo 'Please fix format issues' >&2
    exit 1
}

# Jalankan lint
npm run lint || {
    echo 'Linting failed, attempting to fix issues...' >&2
    npm run lint:fix

    # Periksa kembali linting setelah menjalankan lint:fix
    npm run lint || {
        echo 'Linting still failed after auto-fix. Please fix manually.' >&2
        exit 1
    }

    # Periksa apakah ada perubahan setelah lint:fix
    if [ -n "$(git status --porcelain)" ]; then
        echo 'Changes made by lint:fix. Adding changes to commit...'
        git add . # Tambahkan semua perubahan
        echo 'All changes added. Please proceed with your commit.'
    else
        echo 'No changes made by lint:fix. Exiting.' >&2
        exit 1
    fi
}

# Jika linting berhasil, lanjutkan
echo 'Linting passed.'
echo 'All checks passed.'

# Tambahkan semua perubahan
git add .

# Commit dengan pesan otomatis
git commit -m "Malas isi commit message"

# Push ke repository
git push
