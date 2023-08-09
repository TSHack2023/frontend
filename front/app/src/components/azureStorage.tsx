import { BlobServiceClient } from "@azure/storage-blob";

const account = process.env.REACT_APP_AZURE_ACCOUNT_NAME ?? "account";
const sasToken =
  process.env.REACT_APP_AZURE_SHARED_ACCESS_SIGNATURE ?? "sasToken";

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net${sasToken}`,
);

const containerName = process.env.REACT_APP_AZURE_CONTAINER_NAME ?? "container";

const uploadFile2AzureStorage = async (file: File): Promise<string> => {
  console.log(account);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const content = file;
  const blobName = "react_newblob" + new Date().getTime().toString();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const blobOptions = {
    blobHTTPHeaders: { blobContentType: "File" },
  }; // this is where you set all blob options, including the header and content-type
  const uploadBlobResponse = await blockBlobClient.upload(
    content,
    content.size,
    blobOptions,
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId,
  );
  console.log(
    uploadBlobResponse._response.request.requestId,
    uploadBlobResponse._response.request.url.replace(sasToken, ""),
  );
  const fileUrl = uploadBlobResponse._response.request.url.replace(
    sasToken,
    "",
  );

  return fileUrl;
};

export default uploadFile2AzureStorage;
