import { IKImage } from 'imagekitio-react';

// eslint-disable-next-line react/prop-types
const Image = ({ src, className, w, h, alt }) => {
    // console.log("image kit", src); // https://ik.imagekit.io/fvgio8aze/tr:q-20,bl-6/https:/cloud.appwrite.io/v1/storage/buckets/6601ae2286145d644da8/files/66bf226b145edaafffef/preview?project=6601aacdeb6ec5e9021a

    return (
        <IKImage
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
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