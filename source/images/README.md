# Image Handling Guide

This directory contains all images for the website. Images are organized by content type and post.

## Directory Structure

```
source/images/
├── blog/                    # Blog post images
│   └── post-name/          # Images for specific blog post
│       ├── featured.jpg    # Featured image
│       └── gallery/        # Gallery images
└── portfolio/              # Portfolio project images
    └── project-name/       # Images for specific project
        ├── main.jpg        # Main project image
        └── gallery/        # Project gallery images
```

## Image Guidelines

1. **File Organization**

   - Create a new directory for each post/project
   - Use descriptive file names
   - Keep related images together

2. **Image Formats**

   - Use `.jpg` for photographs
   - Use `.png` for graphics with transparency
   - Use `.webp` for better compression (if supported)

3. **Image Sizes**

   - Featured images: 1200x800px
   - Gallery images: 800x600px
   - Thumbnails: 400x300px

4. **Optimization**
   - Compress images before uploading
   - Use appropriate image dimensions
   - Consider using WebP format for better performance

## Adding Images to Posts

### Blog Posts

1. Create a directory for your post:

   ```bash
   mkdir -p source/images/blog/post-name
   ```

2. Add images to the post:
   ```markdown
   ---
   title: Post Title
   featured_image: /images/blog/post-name/featured.jpg
   gallery:
     - /images/blog/post-name/gallery-1.jpg
     - /images/blog/post-name/gallery-2.jpg
   ---
   ```

### Portfolio Projects

1. Create a directory for your project:

   ```bash
   mkdir -p source/images/portfolio/project-name
   ```

2. Add images to the project:
   ```markdown
   ---
   title: Project Title
   featured_image: /images/portfolio/project-name/main.jpg
   gallery:
     - /images/portfolio/project-name/gallery-1.jpg
     - /images/portfolio/project-name/gallery-2.jpg
   ---
   ```

## Using Images in Content

1. **Markdown Syntax**

   ```markdown
   ![Alt text](/images/blog/post-name/image.jpg)
   ```

2. **HTML with Classes**

   ```html
   <img
   	src="/images/blog/post-name/image.jpg"
   	alt="Alt text"
   	class="w-full md:w-1/2"
   />
   ```

3. **Gallery Grid**
   ```html
   <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
   	<img src="/images/blog/post-name/gallery-1.jpg" alt="Gallery 1" />
   	<img src="/images/blog/post-name/gallery-2.jpg" alt="Gallery 2" />
   </div>
   ```
