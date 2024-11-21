import { IKImage } from 'imagekitio-react';

// eslint-disable-next-line react/prop-types
const Image = ({ src, className, w, h, alt }) => {
    const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;

    // Validate the endpoint exists
    if (!urlEndpoint) {
        console.error("Missing urlEndpoint: Make sure VITE_IK_URL_ENDPOINT is set in the environment variables.");
        return <div>Error: Missing urlEndpoint</div>;
    }

    return (
        <IKImage
            urlEndpoint={urlEndpoint}
            className={className}
            path={src}
            loading="lazy"
            width={w}
            height={h}
            lqip={{ active: true, quality: 20 }}
            alt={alt}
            transformation={[{ height: w, width: h }]}
        />
    )
}

export default Image