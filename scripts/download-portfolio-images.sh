#!/bin/bash

# Create base directory for portfolio images
mkdir -p source/images/portfolio

# Function to download and organize images for a project
download_project_images() {
    local project=$1
    local url=$2
    local dir="source/images/portfolio/$project"
    
    echo "Downloading images for $project..."
    mkdir -p "$dir"
    
    # Download main image
    curl -o "$dir/main.jpg" "$url/main.jpg"
    
    # Download gallery images
    for i in {1..3}; do
        curl -o "$dir/gallery-$i.jpg" "$url/gallery-$i.jpg"
    done
    
    echo "Completed downloading images for $project"
}

# Download images for each project
download_project_images "st-andrews" "https://seaspraypools.com.au/wp-content/uploads/2024/03/st-andrews"
download_project_images "romsey" "https://seaspraypools.com.au/wp-content/uploads/2024/03/romsey"
download_project_images "kew" "https://seaspraypools.com.au/wp-content/uploads/2024/03/kew"
download_project_images "surrey-hills" "https://seaspraypools.com.au/wp-content/uploads/2024/03/surrey-hills"
download_project_images "rowville" "https://seaspraypools.com.au/wp-content/uploads/2024/03/rowville"
download_project_images "elsternwick" "https://seaspraypools.com.au/wp-content/uploads/2024/03/elsternwick"
download_project_images "essendon-2" "https://seaspraypools.com.au/wp-content/uploads/2024/03/essendon-2"
download_project_images "mount-martha" "https://seaspraypools.com.au/wp-content/uploads/2024/03/mount-martha"
download_project_images "glen-iris" "https://seaspraypools.com.au/wp-content/uploads/2024/03/glen-iris"

echo "All images downloaded successfully!" 