import { useNavigate } from "react-router";



const Hero = () => {
  const navigate=useNavigate()
return (
    <section
      className="relative bg-cover bg-center h-150"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        {/* Hero Text */}
        <div className="max-w-xl text-white">
          <h1 className="text-6xl font-bold leading-tight">
            Discover & Join
            <br />
            Amazing <span className="text-purple-400">Events</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Find events that inspire you, connect with people,
            and create unforgettable memories.
          </p>
        </div>
        <button
  onClick={() => navigate("/events")}
  className="mt-8 px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg font-semibold rounded-xl shadow-xl transition duration-300 hover:scale-105"
>
  Explore Events
</button>
        </div>

            

       
    </section>
  );
};

export default Hero;