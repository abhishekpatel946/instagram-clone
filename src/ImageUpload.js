import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "./Firebase";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on("state_changed", (snapshot) => {
      //   progress function
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
        // error function...
        console.log(error)
        alert(error.message)
    },
    () => {
        // complete fuction...
        storage
            .ref('images')
            .child(images.name)
            .getDownloadURL()
            .then(url => {
                // post image inside db
                db.collection('post').add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageUrl: url,
                    username: username,
                });

                setProgress(0);
                setCaption('')
                setImage(null)
            });
        }
  };

  return (
    <div>
        <progress value={progress} max="100" />
        <input
            type="text"
            placeholder="Enter a caption..."
            onChange={(event) => setCaption(event.target.value)}
            value={caption}
        />
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
