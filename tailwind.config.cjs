module.exports = {
content: ["./index.html", "./src/**/*.{ts,tsx}"],
theme: {
extend: {
colors: {
brand: { DEFAULT: "#3b82f6", 600: "#2563eb" }
},
borderRadius: { xl: "1rem", "2xl": "1.25rem" },
boxShadow: { soft: "0 8px 24px rgba(0,0,0,.12)" }
}
},
plugins: []
}