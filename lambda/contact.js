import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "ap-southeast-2" });

export const handler = async (event) => {
	console.log("Event received:", JSON.stringify(event, null, 2));

	// Get the origin from the request headers
	const origin = event.headers?.origin || event.headers?.Origin;

	// Define allowed origins
	const allowedOrigins = [
		"https://d2lcxzu5bokjz5.cloudfront.net",
		"http://d2lcxzu5bokjz5.cloudfront.net",
		"https://seaspraypools.com.au",
		"https://www.seaspraypools.com.au",
		"http://seaspraypools.com.au",
		"http://www.seaspraypools.com.au",
	];

	// Check if origin is allowed, default to first allowed origin if not
	const allowedOrigin = allowedOrigins.includes(origin)
		? origin
		: allowedOrigins[0];

	// Enable CORS - Allow multiple domains
	const headers = {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Headers":
			"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
		"Access-Control-Allow-Methods": "POST,OPTIONS",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Max-Age": "86400",
	};

	// Get HTTP method from HTTP API v2 event structure
	const httpMethod = event.requestContext?.http?.method || event.httpMethod;

	// Handle preflight requests
	if (httpMethod === "OPTIONS") {
		console.log("Handling OPTIONS preflight request from origin:", origin);
		return {
			statusCode: 200,
			headers,
			body: "",
		};
	}

	// Only allow POST
	if (httpMethod !== "POST") {
		console.log("Method not allowed:", httpMethod);
		return {
			statusCode: 405,
			headers,
			body: JSON.stringify({ error: "Method Not Allowed" }),
		};
	}

	try {
		console.log("Processing POST request from origin:", origin);
		const data = JSON.parse(event.body);
		console.log("Parsed data:", data);

		// Determine form type based on fields present
		const isDesignCentreForm =
			data.preferredDate && data.preferredTime && data.projectType;
		const isContactForm = data.enquiry && data.suburb;

		console.log("Form type detected:", { isDesignCentreForm, isContactForm });

		// Common required fields for both forms
		const commonRequiredFields = ["firstName", "lastName", "email", "phone"];

		// Validate common required fields
		for (const field of commonRequiredFields) {
			if (!data[field]) {
				console.log("Missing required field:", field);
				return {
					statusCode: 400,
					headers,
					body: JSON.stringify({ error: `Missing required field: ${field}` }),
				};
			}
		}

		// Validate form-specific fields
		if (isDesignCentreForm) {
			// Design centre form validation
			const designCentreFields = [
				"preferredDate",
				"preferredTime",
				"projectType",
			];
			for (const field of designCentreFields) {
				if (!data[field]) {
					console.log("Missing design centre field:", field);
					return {
						statusCode: 400,
						headers,
						body: JSON.stringify({ error: `Missing required field: ${field}` }),
					};
				}
			}
		} else if (isContactForm) {
			// Contact form validation
			if (!data.suburb) {
				console.log("Missing suburb field for contact form");
				return {
					statusCode: 400,
					headers,
					body: JSON.stringify({ error: "Missing required field: suburb" }),
				};
			}
		} else {
			// Neither form type detected
			console.log("Could not determine form type");
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({
					error: "Invalid form data - could not determine form type",
				}),
			};
		}

		// Check if environment variables are set
		if (!process.env.FROM_EMAIL || !process.env.TO_EMAIL) {
			console.error("Missing environment variables:", {
				FROM_EMAIL: process.env.FROM_EMAIL,
				TO_EMAIL: process.env.TO_EMAIL,
				AWS_REGION: "ap-southeast-2",
			});
			return {
				statusCode: 500,
				headers,
				body: JSON.stringify({
					error: "Server configuration error - missing email settings",
				}),
			};
		}

		// Get the message content from either 'enquiry' or 'message' field
		const messageContent =
			data.enquiry || data.message || "No additional information provided";

		// Prepare email content based on form type
		let subject = "New Contact Form Submission - Seaspray Pools";
		let emailBody = `
			<h2>New Contact Form Submission</h2>
			<p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
			<p><strong>Email:</strong> ${data.email}</p>
			<p><strong>Phone:</strong> ${data.phone}</p>
		`;

		if (isDesignCentreForm) {
			subject = "🎨 DESIGN CENTRE: New Consultation Request - Seaspray Pools";
			emailBody += `
				<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
				<p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
				<p><strong>Project Type:</strong> ${data.projectType}</p>
				<p><strong>Additional Information:</strong></p>
				<p>${messageContent.replace(/\n/g, "<br>")}</p>
			`;
		} else {
			subject = "📧 CONTACT FORM: New Enquiry - Seaspray Pools";
			emailBody += `
				<p><strong>Suburb:</strong> ${data.suburb}</p>
				<p><strong>Enquiry:</strong></p>
				<p>${messageContent.replace(/\n/g, "<br>")}</p>
			`;
		}

		// Prepare email content
		const emailParams = {
			Source: process.env.FROM_EMAIL,
			Destination: {
				ToAddresses: [process.env.TO_EMAIL],
			},
			Message: {
				Subject: {
					Data: subject,
				},
				Body: {
					Html: {
						Data: emailBody,
					},
				},
			},
		};

		console.log("Sending email with params:", emailParams);

		// Send email using AWS SDK v3
		const command = new SendEmailCommand(emailParams);
		await sesClient.send(command);
		console.log("Email sent successfully");

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ message: "Email sent successfully" }),
		};
	} catch (error) {
		console.error("Error:", error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: "Failed to send email",
				details: error.message,
			}),
		};
	}
};
