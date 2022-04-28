import fs from "fs";
import JSZip from "jszip";

// const addFilesFromDirectoryToZip = (directoryPath = "", zip: any) => {
//   [...]
// };

const b64Zip = async (directoryPath : string = "") => {
  const zip = new JSZip();

  zip.file(
    "standalone.txt",
    "I will exist inside of the zip archive, but I'm not a real file here on the server."
  );

//   addFilesFromDirectoryToZip(directoryPath, zip);

  const zipAsBase64 = await zip.generateAsync({ type: "base64" });

  return zipAsBase64;
};

export default b64Zip