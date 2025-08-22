const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
	// Enable CORS - Allow your specific domain
	const headers = {
		"Access-Control-Allow-Origin": "https://d2lcxzu5bokjz5.cloudfront.net",
		"Access-Control-Allow-Headers":
			"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
		"Access-Control-Allow-Methods": "POST,OPTIONS",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Max-Age": "86400",
	};

	// Handle preflight requests
	if (event.httpMethod === "OPTIONS") {
		return {
			statusCode: 200,
			headers,
			body: "",
		};
	}

	// Only allow POST
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			headers,
			body: JSON.stringify({ error: "Method Not Allowed" }),
		};
	}

	try {
		const data = JSON.parse(event.body);

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

		// Send email
		await ses.sendEmail(emailParams).promise();

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
