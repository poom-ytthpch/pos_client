import { Suspense, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import dynamic from "next/dynamic";
import Loading from "./component/layouts/Loading";
import { client } from "../common/apollo-client";
import { gql } from "@apollo/client";
const Default = dynamic(() => import("./component/Default"), {
  suspense: true,
});
import { toBase64 } from "../common/FiletoBase64";

export default function Home() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [image, setImage] = useState("");

  const handleFileChange = async (e: any) => {
    let tmpFile = await e.target.files[0];
    let tmpSplitFile = tmpFile.name.split(".");
    await setFileType("." + tmpSplitFile[1]);
    let tmpBase64 = await toBase64(tmpFile);
    await setFileName(tmpFile.name);
    await setFile(String(tmpBase64));
  };

  const uploadFile = async (e: any) => {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append("file", file as unknown as any);
    const { data } = await client.mutate({
      mutation: gql`
        mutation UploadFile($uploadFileInput: UploadFileInput) {
          uploadFile(uploadFileInput: $uploadFileInput)
        }
      `,
      variables: {
        uploadFileInput: {
          file: file,
          fileName: fileName,
        },
      },
    });
    console.log(fileName);
    await setImage(`http://localhost:4012/${fileName}`);
    console.log(data);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Default title="Index">
        <div className={styles.container}>
          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>

            <form>
              <input
                type="file"
                name="bin"
                onChange={(e) => handleFileChange(e)}
              ></input>
              <button onClick={uploadFile}>Upload</button>
            </form>

            <Image src={image}></Image>

            <p className={styles.description}>
              Get started by editing{" "}
              <code className={styles.code}>pages/index.tsx</code>
            </p>

            <div className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>Documentation &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href="https://nextjs.org/learn" className={styles.card}>
                <h2>Learn &rarr;</h2>
                <p>
                  Learn about Next.js in an interactive course with quizzes!
                </p>
              </a>

              <a
                href="https://github.com/vercel/next.js/tree/canary/examples"
                className={styles.card}
              >
                <h2>Examples &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <h2>Deploy &rarr;</h2>
                <p>
                  Instantly deploy your Next.js site to a public URL with
                  Vercel.
                </p>
              </a>
            </div>
          </main>

          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <span className={styles.logo}>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </footer>
        </div>
      </Default>
    </Suspense>
  );
}
