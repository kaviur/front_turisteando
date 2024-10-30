import { Footer } from "../../components/layout/Footer";
import { Navbar } from "../../components/layout/Navbar";

export default function Products() {
  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <div className="title">
        <p className="text-lg font-bold" style={{ color: "#FF0178" }}>
          Tour por la Reserva Nacional de Paracas
        </p>
      </div>
      <div
        className="button-come-back"
        style={{ marginTop: "20px", width: "100%", textAlign: "right" }}
      >
        <button
          className="btn"
          style={{
            backgroundColor: "#FF0178",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          🔙 Volver atrás
        </button>
      </div>
      <br></br>
      <br></br>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
            className="w-full"
            alt="Slide 1"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
            className="w-full"
            alt="Slide 2"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            className="w-full"
            alt="Slide 3"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full"
            alt="Slide 4"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div
        className="description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "justify",
          height: "100vh",
          padding: "0 20px",
        }}
      >
        <p>
          Explora la hermosa Reserva Nacional de Paracas, ubicada en la costa
          del Pacífico. Este tour te permite disfrutar de impresionantes
          paisajes desérticos, playas aisladas y una rica fauna marina. Puedes
          avistar flamencos, lobos marinos y aves guaneras. Además, visitarás la
          famosa Catedral de Paracas, una formación rocosa icónica, y
          disfrutarás de las vistas del Océano Pacífico desde diversos
          miradores.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <button
          style={{
            backgroundColor: "#FF0178",
            color: "white",
            border: "none",
            padding: "10px 40px",
            borderRadius: "55px",
            cursor: "pointer",
          }}
        >
          Reservar
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div
        className="description-two"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <p style={{ color: "#6E7491" }}>
          Descubre más lugares increíbles para visitar en tu viaje
        </p>
      </div>
      <br></br>
      <>
        <div className="carousel w-full">
          <div id="item1" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
              className="w-full"
              alt="Carousel Item 1"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
              className="w-full"
              alt="Carousel Item 2"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
              className="w-full"
              alt="Carousel Item 3"
            />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
              className="w-full"
              alt="Carousel Item 4"
            />
          </div>
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          <a href="#item2" className="btn btn-xs">
            2
          </a>
          <a href="#item3" className="btn btn-xs">
            3
          </a>
          <a href="#item4" className="btn btn-xs">
            4
          </a>
        </div>
      </>

      <div className="flex justify-center items-center h-screen">
        <button className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="#FF0178"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-center items-start h-screen button-more-options mt-5">
        <button className="btn">Button</button>
      </div>
      <div
        className="location-container"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="location-logo">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.50003 10.6324C10.8642 10.6324 11.97 9.52653 11.97 8.16238C11.97 6.79824 10.8642 5.69238 9.50003 5.69238C8.13589 5.69238 7.03003 6.79824 7.03003 8.16238C7.03003 9.52653 8.13589 10.6324 9.50003 10.6324Z"
              fill="white"
            />
            <path
              d="M2.86577 6.72093C4.42535 -0.134907 14.5824 -0.12699 16.1341 6.72884C17.0445 10.7505 14.5428 14.1547 12.3499 16.2605C10.7587 17.7963 8.24118 17.7963 6.64202 16.2605C4.45702 14.1547 1.95535 10.7426 2.86577 6.72093Z"
              fill="#FF5B03"
            />
            <circle cx="9.5" cy="8.5" r="2.5" fill="#FAF9F9" />
          </svg>
        </div>
        <div className="location">
          <p
            className="text-lg font-bold"
            style={{ color: "#FF5B03", marginLeft: "8px" }}
          >
            Location
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
