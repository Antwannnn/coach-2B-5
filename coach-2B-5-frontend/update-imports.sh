#!/bin/bash

# Script pour mettre à jour les imports dans les fichiers de composants
# Utilisation: ./update-imports.sh

# Fonction pour mettre à jour les imports dans un fichier
update_imports() {
  local file_path=$1
  local file_name=$(basename "$file_path")
  local component_name=${file_name%.ts}
  
  echo "Mise à jour des imports dans $file_path..."
  
  # Mettre à jour les imports relatifs
  sed -i '' 's|../../services|../../../services|g' "$file_path"
  sed -i '' 's|../../models|../../../models|g' "$file_path"
  sed -i '' 's|../../guards|../../../guards|g' "$file_path"
  sed -i '' 's|../../interceptors|../../../interceptors|g' "$file_path"
  
  echo "Imports mis à jour dans $file_path"
}

# Trouver tous les fichiers de composants dans le répertoire pages
component_files=$(find src/app/pages -name "*.component.ts")

# Mettre à jour les imports dans chaque fichier
for file_path in $component_files; do
  update_imports "$file_path"
done

echo "Mise à jour des imports terminée." 