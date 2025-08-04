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

// Home Page Animations
function initHomeAnimations() {
	// Intro section animations
	gsap.fromTo(
		".home-intro-title",
		{ opacity: 0, y: 50 },
		{
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-intro",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	gsap.fromTo(
		".home-intro-subtitle",
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			duration: 1,
			delay: 0.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-intro",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	gsap.fromTo(
		".home-intro-content",
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			duration: 1,
			delay: 0.4,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-intro",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	// Why Seaspray section animations
	gsap.fromTo(
		".home-why-title",
		{ opacity: 0, x: -50 },
		{
			opacity: 1,
			x: 0,
			duration: 1,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-why-seaspray",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	gsap.fromTo(
		".home-why-content",
		{ opacity: 0, x: -50 },
		{
			opacity: 1,
			x: 0,
			duration: 1,
			delay: 0.3,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-why-seaspray",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	gsap.fromTo(
		".home-why-image",
		{ opacity: 0, x: 50 },
		{
			opacity: 1,
			x: 0,
			duration: 1,
			delay: 0.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-why-image",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	// Featured projects animations
	gsap.fromTo(
		".home-featured-title",
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-featured-header",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	gsap.fromTo(
		".home-featured-subtitle",
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			duration: 1,
			delay: 0.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-featured-header",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	// Stagger animation for featured project cards
	gsap.fromTo(
		".home-featured-item",
		{ opacity: 0, y: 50, scale: 0.9 },
		{
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.8,
			stagger: 0.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-featured-grid",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	// Testimonials animations
	gsap.fromTo(
		".home-testimonials-title",
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-testimonials-header",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);

	gsap.fromTo(
		".home-testimonials-subtitle",
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			duration: 1,
			delay: 0.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".home-testimonials-header",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		},
	);
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

	// Initialize home page animations if home elements exist
	if (
		document.querySelector(".home-intro") ||
		document.querySelector(".home-why-seaspray") ||
		document.querySelector(".home-featured-header") ||
		document.querySelector(".home-testimonials-header")
	) {
		initHomeAnimations();
	}
});
