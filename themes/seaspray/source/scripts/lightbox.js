// Lightbox JavaScript
let slideIndex = 1;

function openModal() {
	document.getElementById("myModal").classList.remove("hidden");
	document.getElementById("myModal").classList.add("block");
}

function closeModal() {
	document.getElementById("myModal").classList.add("hidden");
	document.getElementById("myModal").classList.remove("block");
}

function plusSlides(n) {
	showSlides((slideIndex += n));
}

function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("mySlides");
	let dots = document.getElementsByClassName("demo");
	let captionText = document.getElementById("caption");

	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}

	for (i = 0; i < slides.length; i++) {
		slides[i].classList.add("hidden");
		slides[i].classList.remove("block");
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}

	slides[slideIndex - 1].classList.remove("hidden");
	slides[slideIndex - 1].classList.add("block");

	// Update caption with current slide description
	let currentSlide = slides[slideIndex - 1];
	let description = currentSlide.getAttribute("data-description");
	let captionElement = document.getElementById("caption");
	if (captionElement && description) {
		captionElement.textContent = description;
	}

	if (dots.length > 0) {
		dots[slideIndex - 1].className += " active";
	}
}

// Close modal when clicking outside of it
window.onclick = function (event) {
	let modal = document.getElementById("myModal");
	if (event.target == modal) {
		closeModal();
	}
};

// Keyboard navigation
document.addEventListener("keydown", function (event) {
	if (!document.getElementById("myModal").classList.contains("hidden")) {
		if (event.key === "Escape") {
			closeModal();
		} else if (event.key === "ArrowLeft") {
			plusSlides(-1);
		} else if (event.key === "ArrowRight") {
			plusSlides(1);
		}
	}
});
