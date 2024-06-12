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
        Key: `${hash}.pdf`,
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
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME!}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${hash}.pdf`;
  return url;
}

export function getImageS3Url(hash: string) {
  const url = `https://${process.env.IMAGE_BUCKET_NAME!}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${hash}.jpg`;
  return url;
}