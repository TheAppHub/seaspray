// GSAP Animations for Seaspray Pools
// Handles scroll-triggered animations for gallery and portfolio items

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Gallery Animation
function initGalleryAnimations() {
	// Initial state - hide all gallery items
	gsap.set(".gallery-item", {
		opacity: 0,
		y: 100,
		scale: 0.8,
	});

	// Animate each gallery item individually when it comes into view
	gsap.utils.toArray(".gallery-item").forEach((item, index) => {
		gsap.to(item, {
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 1.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: item,
				start: "top 85%",
				end: "bottom 15%",
				toggleActions: "play none none none",
				markers: false,
				immediateRender: false,
			},
		});
	});

	// Animate items already in viewport immediately
	gsap.utils.toArray(".gallery-item").forEach((item) => {
		const rect = item.getBoundingClientRect();
		const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

		if (isInViewport) {
			gsap.to(item, {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 1.2,
				ease: "power3.out",
				delay: 0.2,
			});
		}
	});
}

// Portfolio Animation
function initPortfolioAnimations() {
	// Initial state - hide all portfolio items
	gsap.set(".portfolio-item", {
		opacity: 0,
		y: 100,
		scale: 0.8,
	});

	// Animate each portfolio item individually when it comes into view
	gsap.utils.toArray(".portfolio-item").forEach((item, index) => {
		gsap.to(item, {
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 1.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: item,
				start: "top 85%",
				end: "bottom 15%",
				toggleActions: "play none none none",
				markers: false,
				immediateRender: false,
			},
		});
	});

	// Animate items already in viewport immediately
	gsap.utils.toArray(".portfolio-item").forEach((item) => {
		const rect = item.getBoundingClientRect();
		const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

		if (isInViewport) {
			gsap.to(item, {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 1.2,
				ease: "power3.out",
				delay: 0.2,
			});
		}
	});
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
	// Initialize gallery animations if gallery items exist
	if (document.querySelector(".gallery-item")) {
		initGalleryAnimations();
	}

	// Initialize portfolio animations if portfolio items exist
	if (document.querySelector(".portfolio-item")) {
		initPortfolioAnimations();
	}
});
