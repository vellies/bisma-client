import { useEffect, useRef, useState } from "react";

// Dropzone components
import Dropzone from "dropzone";

// Dropzone styles
import "dropzone/dist/dropzone.css";

// Material Dashboard 2 PRO React TS components
import MDBox from "@@/components/mui/MDBox";

// Custom styles for the MDDropzone
import MDDropzoneRoot from "@@/components/mui/root/MDDropzoneRoot";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "@@/contexts/MuiContext";
// import { getSignedURL, uploadFileToOSS } from "utils/api/upload";
// import { useAuth } from "contexts/AuthContextProvider";

// Declaring props types for MDDropzone
interface Props {
  options: {
    [key: string | number]: any;
  };
  name: string;
  setFilePaths: (path: { [key: string]: string }) => void;
}

interface DropZonePath extends Dropzone {
  objectPath?: string | any;
  binaryBody?: boolean;
}

function MDDropzone({
  options,
  name = "file",
  setFilePaths,
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [filePath, setFilePath] = useState<{ [key: string]: string }>({});
  const dropzoneRef = useRef<HTMLFormElement | null>(null);
  // const { accessToken } = useAuth();

  useEffect(() => {
    Dropzone.autoDiscover = false;
    var Dzone: DropZonePath = new Dropzone(dropzoneRef.current!, {
      ...options,
      method: "PUT",
      autoProcessQueue: false,
      chunking: false,
      uploadMultiple: false,
      init: function () {
        // if (options.maxFiles === 1) {
        //   this.hiddenFileInput?.removeAttribute('multiple');
        // }
        // this.on("addedfile", async (file: any) => {
        //   await getSignedURL(file, accessToken)
        //     .then((response: any) => {
        //       console.log(response.data);
        //       if (response?.data?.responseCode === "1") {
        //         const { signedURL, objectPath } = response.data.data;
        //         setFilePath({ ...filePath, [objectPath]: objectPath })
        //         this.options.url = signedURL;
        //         this.options.headers = { "Content-Type": file.type, 'Access-Control-Allow-Origin': '*' }
        //         // this.processQueue();
        //         uploadFileToOSS(file, signedURL, file.type)
        //           .then((res: any) => {
        //           })
        //           .catch(err => console.log("err"))
        //         this.on('success', (file: DropZonePath) => {
        //           file.objectPath = objectPath;
        //           console.log('success event', objectPath)
        //           if (this.options.maxFiles === 1) {
        //             setFilePaths(objectPath)
        //           } else {
        //             setFilePaths({ ...filePath, [file.objectPath]: file.objectPath })
        //           }
        //         })
        //         console.log("failed to get signed URL");
        //       }
        //     })
        //     .catch((err) => {
        //       console.log("err occured:::signedUrl-axios:::", err);
        //     });
        // });
      },
    });

    Dzone.on("uploadprogress", (file, progress, bytesSent) => {
      console.log({ file, progress, bytesSent });
    });

    function createDropzone() {
      console.log({ ...options });
      return Dzone;
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0)
        Dropzone.instances.forEach((dz: any) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <MDDropzoneRoot
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
      ownerState={{ darkMode }}
    >
      <MDBox className="fallback" bgColor="transparent">
        <input name={name} type="file" multiple />
      </MDBox>
    </MDDropzoneRoot>
  );
}

export default MDDropzone;
