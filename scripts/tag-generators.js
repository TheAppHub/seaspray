const { join } = require("path");
const { readdirSync } = require("fs");

hexo.extend.generator.register("blog-tags", function (locals) {
	const config = this.config.tag_generator;
	const posts = locals.posts.filter((post) =>
		post.source.startsWith("_posts/blog/"),
	);
	const tags = new Set();

	posts.forEach((post) => {
		if (post.tags && post.tags.length) {
			post.tags.forEach((tag) => tags.add(tag.name));
		}
	});

	return Array.from(tags).map((tag) => {
		const tagPosts = posts.filter(
			(post) => post.tags && post.tags.some((t) => t.name === tag),
		);

		return {
			path: join(config.path.replace(":name", tag), "index.html"),
			layout: config.layout,
			data: {
				tag: tag,
				posts: tagPosts,
				current_url: join(config.path.replace(":name", tag), "index.html"),
			},
		};
	});
});

hexo.extend.generator.register("portfolio-tags", function (locals) {
	const config = this.config.portfolio_tag_generator;
	const posts = locals.posts.filter((post) =>
		post.source.startsWith("_posts/portfolio/"),
	);
	const tags = new Set();

	posts.forEach((post) => {
		if (post.tags && post.tags.length) {
			post.tags.forEach((tag) => tags.add(tag.name));
		}
	});

	return Array.from(tags).map((tag) => {
		const tagPosts = posts.filter(
			(post) => post.tags && post.tags.some((t) => t.name === tag),
		);

		return {
			path: join(config.path.replace(":name", tag), "index.html"),
			layout: config.layout,
			data: {
				tag: tag,
				posts: tagPosts,
				current_url: join(config.path.replace(":name", tag), "index.html"),
			},
		};
	});
});
