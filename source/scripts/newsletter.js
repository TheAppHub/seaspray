document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("mc-embedded-subscribe-form");
	const modalElement = document.getElementById("newsletter-success-modal");
	let modalInstance = null;

	// Initialize the modal ONCE
	if (window.Modal) {
		modalInstance = window.Modal.getInstance
			? window.Modal.getInstance(modalElement)
			: null;
		if (!modalInstance) {
			modalInstance = new Modal(modalElement);
		}
	}

	// Check if MailChimp is enabled and configuration exists
	if (!form || !window.mailchimpConfig || !window.mailchimpConfig.enabled) {
		console.log("Newsletter form not found or MailChimp not enabled");
		return;
	}

	form.addEventListener("submit", function (e) {
		// Prevent default form submission
		e.preventDefault();

		const email = document.getElementById("mce-EMAIL").value;

		if (!email) {
			alert("Please enter a valid email address");
			return;
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			alert("Please enter a valid email address");
			return;
		}

		// Submit to MailChimp using fetch
		const formData = new FormData(form);

		fetch(form.action, {
			method: "POST",
			body: formData,
			mode: "no-cors", // Required for MailChimp
		})
			.then(() => {
				// Show success modal using Flowbite
				if (modalInstance) {
					modalInstance.show();
				} else {
					modalElement.classList.remove("hidden");
				}

				// Clear the form
				form.reset();

				// Log success for debugging
				console.log("Newsletter subscription successful for:", email);
			})
			.catch((error) => {
				console.error("Newsletter subscription error:", error);
				alert("There was an error subscribing. Please try again.");
			});
	});

	// Handle modal close buttons
	const closeButtons = document.querySelectorAll(
		'[data-modal-hide="newsletter-success-modal"]',
	);
	closeButtons.forEach((button) => {
		button.addEventListener("click", function () {
			if (modalInstance) {
				modalInstance.hide();
			} else {
				modalElement.classList.add("hidden");
			}
		});
	});

	// Log configuration for debugging (remove in production)
	console.log("MailChimp configuration loaded:", {
		enabled: window.mailchimpConfig.enabled,
		userId: window.mailchimpConfig.userId,
		listId: window.mailchimpConfig.listId,
		serverPrefix: window.mailchimpConfig.serverPrefix,
	});
});
