import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaShareAlt,
} from "react-icons/fa";
const imageStyle = {
  width: "auto",
};
const ShareProduct = ({
  product,
}: {
  product: { id: number; title: string; description: string; image: string };
}) => {
  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/product/${product.id}`;

  const openSocialShare = (platform: string) => {
    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareLink
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareLink
        )}&text=${encodeURIComponent(product.title)}`;
        break;
      case "instagram":
        alert(
          "Instagram sharing is not supported via API, please share manually."
        );
        return;
      default:
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        className="btn btn-ghost hover:bg-opacity-80 shadow-lg text-accent bg-white rounded-full h-16 w-16"
        //@ts-expect-error: daisy UI component functionality.
        onClick={() => document.getElementById("share_modal")?.showModal()}
      >
        <FaShareAlt size={26} />
      </button>

      {/* Modal */}
      <dialog id="share_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Compartir este producto</h3>
          {/* Información del producto */}
          <div className="flex flex-col gap-4 py-4 justify-center items-center">
            <Image
              width={220}
              height={64}
              style={imageStyle}
              src={product.image}
              alt={product.title}
              className="w-64  rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold">{product.title}</p>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
          {/* Opciones de redes sociales */}
          <div className="divider"></div>
          <div className="flex gap-4 justify-center">
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => openSocialShare("facebook")}
            >
              <FaFacebookF size={24} />
            </button>
            <button
              className="text-blue-400 hover:text-blue-600"
              onClick={() => openSocialShare("twitter")}
            >
              <FaTwitter size={24} />
            </button>
            <button
              className="text-pink-600 hover:text-pink-800"
              onClick={() => openSocialShare("instagram")}
            >
              <FaInstagram size={24} />
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary text-white">Cerrar</button>
            </form>
          </div>
        </div>

        {/* Botón para cerrar el modal */}
        <form method="dialog" className="modal-backdrop">
          <button>Cerrar</button>
        </form>
      </dialog>
    </div>
  );
};

export default ShareProduct;
