# Seaspray - Luxury Pool Design & Construction Website

A modern, responsive website built with Hexo for a luxury pool design and construction company. The site features a blog, portfolio showcase, and detailed project pages.

## Features

- Modern, responsive design
- Blog section for pool-related articles
- Portfolio showcase of completed projects
- Project detail pages with galleries
- Tag-based navigation
- SEO optimized

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd seaspray
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The site will be available at `http://localhost:4000`

## Project Structure

```
seaspray/
├── source/                 # Source files
│   ├── _posts/            # Blog posts and portfolio projects
│   │   ├── blog/         # Blog articles
│   │   └── portfolio/    # Portfolio projects
│   ├── about/            # About page
│   └── contact/          # Contact page
├── themes/               # Theme files
│   └── seaspray/        # Custom theme
├── scaffolds/           # Content templates
└── _config.yml         # Site configuration
```

## Creating Content

### Blog Posts

To create a new blog post:

```bash
hexo new post "Your Post Title" --path _posts/blog/your-post-title
```

This will:

1. Create a new file in `source/_posts/blog/your-post-title.md`
2. Create an associated folder `source/_posts/blog/your-post-title/` for your images

The post will have the following structure:

```yaml
---
title: Your Post Title
date: YYYY-MM-DD
description: Your post description
tags:
  - Tag 1
  - Tag 2
hero_image:
featured_image:
readingTime:
layout: post
---
```

### Portfolio Projects

To create a new portfolio project:

```bash
hexo new post "Your Project Title" --path _posts/portfolio/your-project-title
```

This will:

1. Create a new file in `source/_posts/portfolio/your-project-title.md`
2. Create an associated folder `source/_posts/portfolio/your-project-title/` for your project images

Then update the front matter in the file to match the portfolio structure:

```yaml
---
title: Project Title
layout: portfolio-project
date: YYYY-MM-DD
categories: [portfolio]
tags: [concrete-pool, residential, modern]
thumbnail_image:
hero_image:
featured_image:
featured:
gallery:
  - image-1.jpg
  - image-2.jpg
  - image-3.jpg
  - image-4.jpg
project_details:
  location: Location, VIC
  completion_date: YYYY-MM-DD
  pool_type: Concrete Swimming Pool
  size: 8m x 4m
  features:
    - Modern design
    - Water and chemical management system
    - LED multicolour lighting
    - Smooth rendered interior
    - Waterline tiles
    - Solar heating
    - Smart control integration
  awards:
    - Award 1
    - Award 2
    - Award 3
type: portfolio
---
```

### Pages

To create a new page:

```bash
hexo new page "page-name"
```

This will create a new file in `source/page-name/index.md` with the following structure:

```yaml
---
title: Page Title
date: YYYY-MM-DD
description: Page description
hero_image:
featured_image:
layout: page
---
```

## Image Guidelines

- Each post/project automatically gets its own folder for images
- Place images in the post/project's associated folder
- Use the following image fields:
  - `hero_image`: Main hero image (optional)
  - `featured_image`: Featured image for listings (optional)
  - `thumbnail_image`: Thumbnail image (optional)
  - `gallery`: Array of image filenames for project galleries

Example image folder structure:

```
source/_posts/blog/your-post-title/
├── your-post-title.md
├── hero.jpg
├── featured.jpg
└── content-image.jpg
```

## Development

### Building for Production

```bash
npm run build
# or
yarn build
```

### Cleaning Cache

```bash
npm run clean
# or
yarn clean
```

## Deployment

The site can be deployed to any static hosting service. The build output will be in the `public/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

[Add your license information here]
