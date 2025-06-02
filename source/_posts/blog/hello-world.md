---
title: Hello World
date: 2024-03-20
categories: [blog]
tags: [welcome, first-post]
featured_image: /images/blog/hello-world/featured.jpg
gallery:
  - /images/blog/hello-world/gallery-1.jpg
  - /images/blog/hello-world/gallery-2.jpg
---

Welcome to my first blog post! This is a sample blog post to demonstrate the structure.

![Featured Image](/images/blog/hello-world/featured.jpg)

## Using Images in Blog Posts

You can add images to your blog posts in several ways:

1. **Inline Images**

   ```markdown
   ![Alt text](/images/blog/post-name/image.jpg)
   ```

2. **Images with Captions**

   ```markdown
   ![Alt text](/images/blog/post-name/image.jpg "Image caption")
   ```

3. **Responsive Images**
   ```markdown
   <img src="/images/blog/post-name/image.jpg" alt="Alt text" class="w-full md:w-1/2" />
   ```

## Image Gallery

You can also create image galleries in your posts:

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
  <img src="/images/blog/hello-world/gallery-1.jpg" alt="Gallery image 1" class="rounded-lg shadow-lg" />
  <img src="/images/blog/hello-world/gallery-2.jpg" alt="Gallery image 2" class="rounded-lg shadow-lg" />
</div>

## Best Practices

1. Always use descriptive alt text for accessibility
2. Optimize images before uploading
3. Use appropriate image sizes for different contexts
4. Organize images in post-specific folders
