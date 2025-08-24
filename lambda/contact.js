const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
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

	// Handle preflight requests
	if (event.httpMethod === "OPTIONS") {
		console.log("Handling OPTIONS preflight request from origin:", origin);
		return {
			statusCode: 200,
			headers,
			body: "",
		};
	}

	// Only allow POST
	if (event.httpMethod !== "POST") {
		console.log("Method not allowed:", event.httpMethod);
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

		// Validate required fields
		const requiredFields = [
			"firstName",
			"lastName",
			"email",
			"phone",
			"suburb",
			"enquiry",
		];

		for (const field of requiredFields) {
			if (!data[field]) {
				console.log("Missing required field:", field);
				return {
					statusCode: 400,
					headers,
					body: JSON.stringify({ error: `Missing required field: ${field}` }),
				};
			}
		}

		// Prepare email content
		const emailParams = {
			Source: process.env.FROM_EMAIL,
			Destination: {
				ToAddresses: [process.env.TO_EMAIL],
			},
			Message: {
				Subject: {
					Data: "New Contact Form Submission - Seaspray Pools",
				},
				Body: {
					Html: {
						Data: `
                            <h2>New Contact Form Submission</h2>
                            <p><strong>Name:</strong> ${data.firstName} ${
							data.lastName
						}</p>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Phone:</strong> ${data.phone}</p>
                            <p><strong>Suburb:</strong> ${data.suburb}</p>
                            <p><strong>Enquiry:</strong></p>
                            <p>${data.enquiry.replace(/\n/g, "<br>")}</p>
                        `,
					},
				},
			},
		};

		console.log("Sending email with params:", emailParams);

		// Send email
		await ses.sendEmail(emailParams).promise();
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
			body: JSON.stringify({ error: "Failed to send email" }),
		};
	}
};
