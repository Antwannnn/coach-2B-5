#!/bin/bash

# Script pour nettoyer les fichiers dupliqués
# Utilisation: ./cleanup-duplicates.sh

# Supprimer les fichiers dupliqués dans le répertoire pages
echo "Suppression des fichiers dupliqués..."

# Supprimer les fichiers dans les répertoires génériques
rm -rf src/app/pages/dashboard
rm -rf src/app/pages/profile
rm -rf src/app/pages/seances
rm -rf src/app/pages/sportifs
rm -rf src/app/pages/coachs
rm -rf src/app/pages/fiches-de-paie
rm -rf src/app/pages/statistiques
rm -rf src/app/pages/coach-list
rm -rf src/app/pages/login
rm -rf src/app/pages/register
rm -rf src/app/pages/home

echo "Nettoyage terminé." 