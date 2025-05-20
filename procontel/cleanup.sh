#!/bin/bash
echo "Cleaning up..."

# Eliminar completamente el directorio app
echo "Removing app directory..."
rm -rf app
rm -rf ./app

# Eliminar el directorio .next
echo "Removing .next directory..."
rm -rf .next

# Crear un archivo .gitkeep en src/pages para asegurarnos de que el directorio existe
mkdir -p src/pages
touch src/pages/.gitkeep

echo "Cleanup completed"
