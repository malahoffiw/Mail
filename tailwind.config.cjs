/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: ['12px', '18px'],
      base: ['15px', '22px'],
      lg: ['18px', '26px'],
    },
    colors: {
      "transparent": "#49505799",
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
    minWidth: {
      "120px": "120px",
    },
    extend: {},
  },
  plugins: [],
}
