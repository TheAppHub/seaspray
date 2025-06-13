/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./themes/seaspray/layout/**/*.ejs",
		"./source/**/*.{js,jsx,ts,tsx,vue,html,md}",
		"./themes/**/*.{js,jsx,ts,tsx,md,mdx}",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f0f4f8",
					100: "#d9e2ec",
					200: "#b3c5d7",
					300: "#8da0b3",
					400: "#667b8f",
					500: "#40566b",
					600: "#2a3f54",
					700: "#1a2b3d",
					800: "#0a1b26",
					900: "#000b14",
				},
				secondary: {
					50: "#f5f3ef",
					100: "#ebe7df",
					200: "#d7cfbf",
					300: "#c3b79f",
					400: "#a08c6a",
					500: "#8c7a5a",
					600: "#706248",
					700: "#544936",
					800: "#383124",
					900: "#1c1812",
				},
			},
			fontFamily: {
				sans: ["Open Sans", "sans-serif"],
				display: ["Montserrat", "sans-serif"],
				body: ["Montserrat", "sans-serif"],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: "65ch",
						color: "inherit",
						a: {
							color: "inherit",
							textDecoration: "underline",
							fontWeight: "500",
						},
						strong: {
							color: "inherit",
						},
						code: {
							color: "inherit",
						},
					},
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("flowbite/plugin"),
	],
};
