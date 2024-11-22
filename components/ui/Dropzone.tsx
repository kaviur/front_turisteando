import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

interface DropzoneProps {
  className?: string;
  onDrop: (acceptedFiles: File[]) => void;
  remainingImagesToUpload: number;
}

const Dropzone: React.FC<DropzoneProps> = ({ className, onDrop, remainingImagesToUpload }) => {

  const isDisabled = remainingImagesToUpload === 0;
  
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles); // Llama la función pasada por el padre
    },
    [onDrop]
  );

  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   console.log(acceptedFiles)
  // }, [])
  
  const { getRootProps, getInputProps, isDragActive} = useDropzone({ 
    onDrop: handleDrop,
    maxFiles: remainingImagesToUpload, // Restringe la cantidad máxima de archivos
    disabled: isDisabled, 
  });

  return (
    <div
      {...getRootProps()}
      className={className}
      style={{
        border: '2px dashed gray',
        padding: '20px',
        textAlign: 'center', // Centrar el contenido
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centrar verticalmente
        justifyContent: 'center',
        height: '150px', // Altura para que sea más visible
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta las imágenes aquí ...</p>
      ) : (
        <>
          <p>Arrastra y suelta las imágenes aquí o haz clic para seleccionar</p>
          <p style={{ color: '#d3d3d3' }}> {/* Color gris claro */}
            {remainingImagesToUpload === 0
              ? "No puedes subir más imágenes."
              : remainingImagesToUpload === 1
              ? "Agrega otra imagen."
              : remainingImagesToUpload === 5
              ? "Agrega 5 imágenes."
              : `Agrega ${remainingImagesToUpload} imágenes más.`}
          </p>
        </>
      )}
    </div>
  );
}

export default Dropzone