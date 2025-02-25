export default function SimpleWave() {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#1d3d3c]" />
        <svg
          className="absolute bottom-0 left-0 w-full h-[40vh] animate-wave"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            fillOpacity="0.5"
            d="M0,224L48,229.3C96,235,192,245,288,234.7C384,224,480,192,576,181.3C672,171,768,181,864,197.3C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    )
  }
  