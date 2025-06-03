const { join } = require("path");

hexo.extend.filter.register("after_init", function () {
	const portfolioDir = join(hexo.source_dir, "_posts", "portfolio");
	const posts = hexo.locals.get("posts");

	posts.each((post) => {
		if (post.source.startsWith("_posts/portfolio/")) {
			post.path = `portfolio/${post.slug}/`;
		}
	});
});
