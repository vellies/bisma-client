import { JWTToken } from "@@/config/constant";

export default function useFunction() {

  function initialRender() {
  }

  function getToken() {
    let token = null;
    let thisToken = localStorage.getItem(JWTToken);
    if(thisToken !== null) {
      let tokenData = JSON.parse(thisToken);
      if (tokenData !== null && tokenData.token !== undefined) {
        token = tokenData.token;
      }
    }

    return token;
  }

  const uploadFile = async (url: string, file: any) => {
    try {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.onload = () => {
          if (xhr.status !== 200) {
            reject(
              new Error(
                `Request failed. Status: ${xhr.status}. Content: ${xhr.responseText}`
              )
            );
          }
          resolve(xhr.responseText);
        };
        xhr.send(file);
      });
    } catch (error) {
    }
  };

  const validImageExt = [".jpg", ".jpeg", ".bmp", ".png"];
  function validateImageExt(fileName: any) {
    if (fileName.length > 0) {
      let blnValid = false;
      for (let j = 0; j < validImageExt.length; j++) {
        let validExt = validImageExt[j];
        if (
          fileName
            .substr(fileName.length - validExt.length, validExt.length)
            .toLowerCase() === validExt.toLowerCase()
        ) {
          blnValid = true;
          break;
        }
      }
      if (!blnValid) return false;
    }
    return true;
  }

  const validFileExt = [".jpg", ".jpeg", ".bmp", ".png", ".xls", "xlsx", "pdf", "csv"];
  function validateFileExt(fileName: any) {
    if (fileName.length > 0) {
      let blnValid = false;
      for (let j = 0; j < validFileExt.length; j++) {
        let validExt = validFileExt[j];
        if (
          fileName
            .substr(fileName.length - validExt.length, validExt.length)
            .toLowerCase() === validExt.toLowerCase()
        ) {
          blnValid = true;
          break;
        }
      }
      if (!blnValid) return false;
    }
    return true;
  }

  function formatFilename(filename = "") {
    const date = new Date().getTime();
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);
    let cleanFileName = "p";
    if (filename !== undefined)
      cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 100);
  }

  return {
    initialRender,
    getToken,
    uploadFile,
    formatFilename,
    validateImageExt,
    validateFileExt,
  };
}
