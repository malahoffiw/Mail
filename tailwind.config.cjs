/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // #f8f9fa, #e9ecef, #dee2e6, #ced4da, #adb5bd, #6c757d, #495057, #343a40, #212529
      "neutral": {
        "100": "#f8f9fa",
        "200": "#e9ecef",
        "300": "#dee2e6",
        "400": "#ced4da",
        "500": "#adb5bd",
        "600": "#6c757d",
        "700": "#495057",
        "800": "#343a40",
        "900": "#212529",
      },
      "black": "#001219",
      "yellow": "#ffba08",
      "ruby": "#9b2226",
      "blue": "#4361ee",
      "green": "#3bb273",
    },
    extend: {},
  },
  plugins: [],
}
