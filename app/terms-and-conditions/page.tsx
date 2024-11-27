"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function TermsAndConditions() {
    return (
        <>
            <Navbar />
            {/* Título de la página */}
            <h1 className="font-bold text-[30px] leading-[41.66px] tracking-[-0.0161em] text-[#7C8DB0] text-left underline pt-24 px-14">
                Términos y Condiciones
            </h1>

            <div className="px-36 py-8 mx-auto text-[#7C8DB0]">
                {/* Párrafo de bienvenida */}
                <div>
                    <p className="font-bold text-[18px] text-justify mb-8 text-[#7C8DB0]">
                        Bienvenido a Turisteando. Al utilizar nuestra plataforma y reservar cualquiera de los productos ofrecidos, aceptas los términos y condiciones descritos a continuación. Recomendamos leer esta sección detenidamente antes de realizar una reserva.
                    </p>
                </div>

                {/* Sección de Políticas de Uso y Reglas Generales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Columna 1: Políticas de Uso */}
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <h2 className="text-2xl mb-4 font-semibold">Políticas de Uso de los Productos</h2>
                        <h3 className="text-xl mb-2 font-medium">1. Uso Responsable de los Servicios</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Los tours y actividades deben realizarse según las instrucciones brindadas por los guías y operadores asignados.</li>
                            <li>Es obligatorio respetar las normas locales, ambientales y culturales de cada lugar visitado.</li>
                            <li>Cualquier daño a los recursos naturales o instalaciones debido a negligencia será responsabilidad del cliente.</li>
                        </ul>

                        <h3 className="text-xl mb-2 font-medium">2. Precauciones y Recomendaciones</h3>
                        <ul className="list-disc pl-6">
                            <li>Verifica que tu estado de salud sea apto para participar en las actividades seleccionadas. Informa al operador sobre cualquier condición médica o limitación física antes de iniciar el tour.</li>
                            <li>Usa vestimenta adecuada según las condiciones climáticas y el tipo de actividad (por ejemplo, zapatos cómodos para caminatas, ropa impermeable si es temporada de lluvia).</li>
                            <li>Sigue todas las recomendaciones de seguridad proporcionadas por los guías o el personal del tour.</li>
                        </ul>
                    </div>
                    

                    {/* Columna 2: Políticas de Cancelación */}
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <h2 className="text-2xl mb-4 font-semibold">Políticas de Cancelación</h2>
                        <h3 className="text-xl mb-2 font-medium">1. Cancelaciones por Parte del Cliente</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Las cancelaciones deben ser solicitadas con un mínimo de 48 horas de anticipación para obtener un reembolso completo.</li>
                            <li>Las cancelaciones realizadas dentro de las 48 horas previas al inicio del tour no serán reembolsables.</li>
                        </ul>

                        <h3 className="text-xl mb-2 font-medium">2. Cancelaciones por Parte del Operador</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>En caso de condiciones climáticas extremas, cierre de accesos o cualquier otra causa de fuerza mayor, el operador se reserva el derecho de cancelar o reprogramar el tour. Los clientes serán informados oportunamente y se ofrecerá una alternativa o un reembolso completo.</li>
                        </ul>

                        <h3 className="text-xl mb-2 font-medium">3. Modificaciones de Reservas</h3>
                        <ul className="list-disc pl-6">
                            <li>Las modificaciones de reservas (como cambio de fecha o nombre del participante) están sujetas a disponibilidad y deben ser solicitadas al menos 72 horas antes de la actividad programada.</li>
                        </ul>
                    </div>
                    {/* Sección de Reglas Generales */}
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-2xl mb-4 font-semibold">Reglas Generales</h2>
                    <h3 className="text-xl mb-2 font-medium">1. Edad Mínima</h3>
                    <p className="mb-4">Algunas actividades pueden requerir una edad mínima para participar. Verifica los requisitos específicos del tour antes de reservar.</p>

                    <h3 className="text-xl mb-2 font-medium">2. Propiedad Intelectual</h3>
                    <p className="mb-4">Todo el contenido, imágenes y textos de este sitio web son propiedad de nuestra empresa. Está prohibida la reproducción sin autorización previa.</p>

                    <h3 className="text-xl mb-2 font-medium">3. Contacto</h3>
                    <p>Si tienes dudas sobre estos términos o deseas realizar consultas adicionales, puedes comunicarte con nosotros a través de <a href="mailto:contacto@turisteando.com" className="text-blue-600 hover:underline">contacto@turisteando.com</a>.</p>
                </div>
                </div>

                
            </div>
            <Footer />
        </>
    );
}

