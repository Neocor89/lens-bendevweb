import { useState } from "react";
import styles from "../styles/Create.module.css";

export default function create() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");

  console.log({ image, title, description, content });

  
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>

        {/* Input for the image */}
        <div className={styles.inputContainer}>
          <input 
          className={styles.inputFile}
            type="file" 
            onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }} />
        </div>

        {/* Input for the title */}
        <div className={styles.inputContainer}>
          <input 
          className={styles.input}
            type="text" 
            placeholder="Title" 
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <textarea 
          className={styles.filedContent}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>


        {/* CONTENT */}
        <div className={styles.inputContainer}>
          <textarea 
          className={styles.filedContent}
            placeholder="Content"
            rows={10}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}