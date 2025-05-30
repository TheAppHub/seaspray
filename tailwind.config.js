/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./themes/seaspray/layout/**/*.ejs",
		"./source/**/*.{js,jsx,ts,tsx,vue,html,md}",
		"./themes/**/*.{js,jsx,ts,tsx,md,mdx}",
		"./node_modules/flowbite/**/*.js",
	],
	darkMode: "class",
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
					50: "#fdf8e6",
					100: "#fbf1cd",
					200: "#f7e39b",
					300: "#f3d569",
					400: "#efc737",
					500: "#d4a81f",
					600: "#a68318",
					700: "#785e11",
					800: "#4a390a",
					900: "#1c1403",
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
