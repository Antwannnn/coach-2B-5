#!/bin/bash

# Script pour migrer tous les composants Angular vers une structure MVC
# Utilisation: ./migrate-all-to-mvc.sh

# Créer le répertoire pages s'il n'existe pas
mkdir -p src/app/pages

# Fonction pour extraire le nom du composant à partir du chemin du fichier
extract_component_name() {
  local file_path=$1
  local file_name=$(basename "$file_path")
  local component_name=${file_name%.ts}
  echo "$component_name"
}

# Fonction pour extraire le nom de la page à partir du nom du composant
extract_page_name() {
  local component_name=$1
  local page_name=${component_name%.component}
  echo "$page_name"
}

# Fonction pour migrer un composant
migrate_component() {
  local component_path=$1
  local component_name=$(extract_component_name "$component_path")
  local page_name=$(extract_page_name "$component_name")
  
  # Vérifier si le composant utilise un template inline
  if grep -q "template: \`" "$component_path"; then
    echo "Migration du composant $component_name vers la structure MVC..."
    
    # Créer le répertoire de la page
    local page_dir="src/app/pages/$page_name"
    mkdir -p "$page_dir"
    
    # Extraire le template du fichier du composant
    local template_start=$(grep -n "template: \`" "$component_path" | cut -d ':' -f 1)
    if [ -z "$template_start" ]; then
      echo "Pas de template trouvé dans $component_path"
      return
    fi
    
    # Trouver la fin du template
    local template_end=$(tail -n +$template_start "$component_path" | grep -n "\`," | head -1 | cut -d ':' -f 1)
    if [ -z "$template_end" ]; then
      echo "Impossible de trouver la fin du template dans $component_path"
      return
    fi
    
    template_end=$((template_start + template_end - 1))
    
    # Extraire le contenu du template
    sed -n "$((template_start+1)),$((template_end-1))p" "$component_path" > "$page_dir/$component_name.html"
    
    # Créer un fichier CSS vide
    touch "$page_dir/$component_name.css"
    
    # Créer le fichier du composant avec templateUrl et styleUrls
    # Sauvegarder le contenu original
    cp "$component_path" "$component_path.bak"
    
    # Remplacer la déclaration du template inline par templateUrl et styleUrls
    awk -v start="$template_start" -v end="$template_end" -v component="$component_name" '
    {
      if (NR >= start && NR <= end) {
        if (NR == start) {
          print "  templateUrl: '\''./" component ".html'\'',"
          print "  styleUrls: ['\''./" component ".css'\'']"
        }
      } else {
        print $0
      }
    }' "$component_path.bak" > "$page_dir/$component_name.ts"
    
    echo "Migration terminée. Fichiers créés :"
    echo "- $page_dir/$component_name.html"
    echo "- $page_dir/$component_name.css"
    echo "- $page_dir/$component_name.ts"
    echo ""
  else
    echo "Le composant $component_name n'utilise pas de template inline, il est ignoré."
  fi
}

# Trouver tous les fichiers de composants
component_files=$(find src/app/components -name "*.component.ts")

# Migrer chaque composant
for component_path in $component_files; do
  migrate_component "$component_path"
done

echo "Migration de tous les composants terminée."
echo "N'oubliez pas de mettre à jour les imports dans votre application pour pointer vers les nouveaux emplacements des composants." 