const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

const s3 = new AWS.S3();

async function getCountryImageUrls(req, res) {
    try {
  
      const params = {
        Bucket: 'dunyasehirleri'
      };
  
      const data = await s3.listObjectsV2(params).promise();
  
      const imageUrls = data.Contents.map(obj => {
        const signedUrl = s3.getSignedUrl('getObject', {
          Bucket: params.Bucket,
          Key: obj.Key,
          Expires: 86400, // URL expiration time in seconds (optional)
        });
        return {
          key: obj.Key,
          url: signedUrl
        };
      });
  
      res.json(imageUrls);
    } catch (error) {
      console.error('Error generating signed URL:', error);
      res.status(500).json({ error: 'Failed to generate signed URL' });
    }
}

async function getCityImageUrls(req, res) {
    try {
  
      const params = {
        Bucket: 'dunyasehirlericityimages'
      };
  
      const data = await s3.listObjectsV2(params).promise();
  
      const imageUrls = data.Contents.map(obj => {
        const signedUrl = s3.getSignedUrl('getObject', {
          Bucket: params.Bucket,
          Key: obj.Key,
          Expires: 604000, // URL expiration time in seconds (optional)
        });
        return {
          key: obj.Key,
          url: signedUrl
        };
      });
  
      res.json(imageUrls);
    } catch (error) {
      console.error('Error generating signed URL:', error);
      res.status(500).json({ error: 'Failed to generate signed URL' });
    }
  }

module.exports = {getCountryImageUrls, getCityImageUrls}