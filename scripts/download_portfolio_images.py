#!/usr/bin/env python3

import os
import requests
from bs4 import BeautifulSoup
import time
from urllib.parse import urljoin, urlparse

# Base URL for the portfolio pages
BASE_URL = "https://seaspraypools.com.au/portfolio_page/"

# Projects to download
PROJECTS = [
    "st-andrews",
    "romsey",
    "kew",
    "surrey-hills",
    "rowville",
    "elsternwick",
    "essendon-2",
    "mount-martha",
    "glen-iris"
]

def download_image(url, save_path):
    """Download an image from a URL and save it to the specified path."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, stream=True, timeout=15)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        print(f"Downloaded: {save_path}")
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def get_image_filename(url):
    # Extract the filename from the URL
    parsed = urlparse(url)
    return os.path.basename(parsed.path)

def get_project_images(project_name):
    """Get image URLs from a project page."""
    url = urljoin(BASE_URL, project_name)
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        images = set()
        # Find all <a class="e-gallery-item"> tags
        for a in soup.find_all('a', class_='e-gallery-item'):
            href = a.get('href')
            if href and href.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                images.add(href)
        return list(images)
    except Exception as e:
        print(f"Error getting images for {project_name}: {e}")
        return []

def main():
    # Create base directory
    os.makedirs("source/images/portfolio", exist_ok=True)
    
    for project in PROJECTS:
        print(f"\nProcessing {project}...")
        project_dir = f"source/images/portfolio/{project}"
        os.makedirs(project_dir, exist_ok=True)
        
        # Get image URLs
        image_urls = get_project_images(project)
        
        if not image_urls:
            print(f"No images found for {project}")
            continue
        
        print(f"Found {len(image_urls)} images for {project}")
        
        # Download images
        for url in image_urls:
            filename = get_image_filename(url)
            save_path = os.path.join(project_dir, filename)
            download_image(url, save_path)
        
        # Be nice to the server
        time.sleep(2)

if __name__ == "__main__":
    main() 