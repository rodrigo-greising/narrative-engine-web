import S3 from "aws-sdk/clients/s3";
import { uuid } from 'uuidv4';

export async function uploadPDFToS3(
  file: File,
  hash: string,
): Promise<{ hash: string; file_name: string }> {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        region: "us-west-2",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: hash,
        Body: file,
      };
      s3.putObject(
        params,
        (err: any, data: PutObjectCommandOutput | undefined) => {
          return resolve({
            hash,
            file_name: file.name,
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export function getPDFS3Url(hash: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${hash}`;
  return url;
}


export async function uploadImageToS3(
  file: File,
): Promise<{ file_url }> {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        region: "us-west-2",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });

      const randomkey = uuid();

      const key = `campaignimages/${randomkey}`;


      const params = {
        Bucket: process.env.IMAGE_BUCKET_NAME!,
        Key: key,
        Body: file,
      };


      s3.putObject(
        params,
        (err: any, data: PutObjectCommandOutput | undefined) => {
          const url = `https://${process.env.NEXT_PUBLIC_S3_IMAGE_BUCKET_NAME!}.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${key}`;
          return resolve({
            file_url: url,
          });
        }
      );

    } catch (error) {
      reject(error);
    }
  });
}