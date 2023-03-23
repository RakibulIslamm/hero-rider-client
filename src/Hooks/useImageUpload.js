import { useState } from "react";


const useImageUpload = () => {

    const [isUploading, setIsUploading] = useState(false);

    const handleUploadPhoto = async (file) => {
        setIsUploading(true);
        if (!file) {
            console.log('Image not found')
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "testttttttttttttttt");
        formData.append("cloud_name", 'deonmtztm');

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/deonmtztm/image/upload`, {
                method: "post",
                body: formData
            });
            const data = await res.json();

            // Upload Image
            const img = data.secure_url;
            return img;
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsUploading(false)
        }
    }

    return {
        handleUploadPhoto,
        isUploading
    }
}

export default useImageUpload;