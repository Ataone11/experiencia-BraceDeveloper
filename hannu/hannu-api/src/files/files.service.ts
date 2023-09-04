import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class FilesService {
  async uploadPublicFiles(baseRoute: string, files: Express.Multer.File[]) {
    const uploadsPromises = [];
    const s3 = new S3();

    if(files) {
      files.forEach(file => {
        const dataBuffer = file.buffer;
        const filename = file.originalname;
  
        uploadsPromises.push(s3.upload({
          ACL: 'public-read',
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Body: dataBuffer,
          Key: `${baseRoute}/${filename}`
        }).promise());
      });
      
      const uploadResult = await Promise.all(uploadsPromises);
    
      return uploadResult.map(res => res.Key);
    } else {
      return [];
    }
  }

  async uploadVideoLugar(baseRoute: string, file: Express.Multer.File) {
    const s3 = new S3();

    const dataBuffer = file.buffer;
    const filename = file.originalname;
    const fileNameParts = filename.split(".");
    const formato = fileNameParts[fileNameParts.length - 1];

    const res = await s3.upload({
      ACL: 'public-read',
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: dataBuffer,
      Key: `${baseRoute}/video.${formato}`
    }).promise()

    return res.Key;
  }

  async deleteFiles(keys: string[]) {
    if(!keys || keys.length === 0)
      return
    
    const s3 = new S3();

    const res = await s3.deleteObjects({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Delete: {
        Objects: keys.map(key => ({Key: key}))
      }
    }).promise();

    return res;
  }
}
