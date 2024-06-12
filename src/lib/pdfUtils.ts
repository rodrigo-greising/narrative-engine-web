import {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    ExportPDFParams,
    ExportPDFTargetFormat,
    ExportPDFJob,
    ExportPDFResult
} from '@adobe/pdfservices-node-sdk';
import fs from 'fs';

import { PDFDocument } from 'pdf-lib';
import { createCanvas } from 'canvas';

export async function generateThumbnail2(file_name: string) {
    let readStream;
  try {
    // Initial setup, create credentials instance
    const credentials = new ServicePrincipalCredentials({
      clientId: process.env.PDF_SERVICES_CLIENT_ID!,
      clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET!
    });

    // Creates a PDF Services instance
    const pdfServices = new PDFServices({credentials});

    // Creates an asset(s) from source file(s) and upload
    readStream = fs.createReadStream(file_name);
    const inputAsset = await pdfServices.upload({
      readStream,
      mimeType: MimeType.PDF
    });

    // Create parameters for the job
    const params = new ExportPDFParams({
      targetFormat: ExportPDFTargetFormat.DOC
    });

    // Creates a new job instance
    const job = new ExportPDFJob({inputAsset, params});

    // Submit the job and get the job result
    const pollingURL = await pdfServices.submit({job});
    const pdfServicesResponse = await pdfServices.getJobResult({
      pollingURL,
      resultType: ExportPDFResult
    });

    // Get content from the resulting asset(s)
    const resultAsset = pdfServicesResponse.result.asset;
    const streamAsset = await pdfServices.getContent({asset: resultAsset});

    // Creates an output stream and copy stream asset's content to it
    const outputFilePath = "./Bodea Brochure.docx";
    console.log(`Saving asset at ${outputFilePath}`);
    const outputStream = fs.createWriteStream(outputFilePath);
    streamAsset.readStream.pipe(outputStream);
  } catch (err) {
    console.log("Exception encountered while executing operation", err);
  } finally {
    readStream?.destroy();
  }

}

export async function generateThumbnail(pdfPath:string , outputPath: string) {
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPage(0);
  
    const { width, height } = page.getSize();
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
  
    // You might need to scale the rendering to fit the thumbnail size you want
    const scaleFactor = 0.5; // Adjust scale factor as needed
    ctx.scale(scaleFactor, scaleFactor);
  
    await page.node.render({
      canvasContext: ctx,
      viewport: page.getViewport({ scale: 1 }),
    });
  
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Thumbnail saved to ${outputPath}`);
  }