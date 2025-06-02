#!/usr/bin/env python3

import os
import shutil
from pathlib import Path

# Project name mappings for SEO-friendly names
PROJECT_NAMES = {
    'st-andrews': 'st-andrews-pool-project',
    'romsey': 'romsey-pool-project',
    'kew': 'kew-pool-project',
    'surrey-hills': 'surrey-hills-pool-project',
    'rowville': 'rowville-pool-project',
    'elsternwick': 'elsternwick-pool-project',
    'essendon-2': 'essendon-pool-project',
    'mount-martha': 'mount-martha-pool-project',
    'glen-iris': 'glen-iris-pool-project'
}

def rename_images():
    base_dir = Path('source/images/portfolio')
    
    for project_dir in base_dir.iterdir():
        if not project_dir.is_dir():
            continue
            
        project_name = project_dir.name
        if project_name not in PROJECT_NAMES:
            continue
            
        seo_name = PROJECT_NAMES[project_name]
        print(f"\nProcessing {project_name}...")
        
        # First, remove any PNG files (logo files)
        for file in project_dir.glob('*.png'):
            print(f"Removing logo file: {file}")
            try:
                os.remove(file)
            except Exception as e:
                print(f"Error removing {file}: {e}")
        
        # Get all JPG files
        jpg_files = list(project_dir.glob('*.jpg'))
        
        # Find the main image
        main_image = None
        for file in jpg_files:
            if 'main' in file.name.lower():
                main_image = file
                break
        
        # Rename files
        for i, file in enumerate(jpg_files):
            if file == main_image:
                # This is the main image
                new_name = f"{seo_name}-main.jpg"
            else:
                # This is a gallery image
                new_name = f"{seo_name}-gallery-{i+1}.jpg"
            
            new_path = file.parent / new_name
            print(f"Renaming {file.name} to {new_name}")
            try:
                os.rename(file, new_path)
            except Exception as e:
                print(f"Error renaming {file}: {e}")

if __name__ == "__main__":
    rename_images() 