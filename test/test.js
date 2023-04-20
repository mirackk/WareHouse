const vision = require('@google-cloud/vision');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const fs = require('fs');
// const client = new vision.ImageAnnotatorClient();

const tmpkey = {
    "type": "service_account",
    "project_id": "mirackcompetitionmeta",
    "private_key_id": "ca3eba2def25f2f1c31c4588cc303affb59acb45",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRsG1ogYEzVC/N\nLLeljfRWuDdMju11pFr+oPfmhHS0kco14hO9UnceB8zlV3dG9gdtfaRgGgU3WNSF\nLe+RwQsAv2SF3BXLSjJwQtviOM6HQcYWkCCuAASwhoN5gEziUaVyYQzc3BEjTYXU\nZBBYTgrFbC5lpYcVXh9TNuRK44LuMSTylEZ8iwdvFS2Ml3rA9sT+/GHn+hbvk5Qb\ncTf2dOIiMCfjrCzv0m6dljIloE+BPdoCEzX4/3NhdnUdcGha+KDSLkATi6RUt+Sb\nULYSQbRZ/HEz7zvWydHE/+X34OorGjrm0njqJ5/u6IeD5MJ25aHdBj5vbuPuSMq5\n3BbHIwnLAgMBAAECggEAJ5YjqZGdZyfTGGyDRSV+BeskQXdQPB/pr92Kv4GtGLPX\nVYHXUSwi4c/+LiPrmEF1WIXaROxUpMTH5lasPjuQDLWVUDIjCSx6RjhRE62+y8ku\nkO7nxIGrYPocExGWMjnQvr20tHN1ZtFJXTYA4fLl1KyeO8Fatb19s3OO+NZnzviv\nsgBB0XKtB+15FkomIuM5wXothGJ31KiR7uJUEKZ94kGeZ8QtHbAmOY+0sjgp9n8D\nmhyVgpzTzr103ZQaCpgsEN4cobdLwTForz/v6FSxkHflQdyGrcresGnRZPKOlTuK\n3fPuHlh6hIUFNAszJvh9JmZh4eai7wgw9pjzBhItRQKBgQDo0bqCRr72U4V73GSO\n9PsnDyYXBgu8CR6QXpKNhm+4aiwrpa6xI5QsT1LfAU9fI389WKjkPR26NREgq6vC\nARxfqPEfPkq2z81/UA4Mh6a5Huln7Ato2wgr9earKrxN26xD7qWN3E0xEnp4eSZ1\nz3Xm26sx1jYscMPPJoKsVbRpFwKBgQDmkSRXOeTi3GwoK43WzhNWFT90cxblDT6Y\nYhpkO7jtFByC3u8N0+S1vz9154S26gfGAp70bG50hOV0/Z6gpYXq9huGqECJCInP\n+Ueqj2IIC6a8ER1oEPFsd91tGyuCqwa23mC/boJtL2PP5D1EGEMGZTsOFRk1LLKY\noqbxUTjtbQKBgDQ7cTtvAcKjpEvQeyLzZTEzHdmGerV52kiLXxevNHtMHpLAPfvx\nvnleZnovgg4XGaG6tVFXQMcYxrnsqcEBnMr9TPM0d3CiGDlazXwUJtxbSgQNmdWx\nZhjutwxprwtMoE4xSSUVap/6xE0o6O7/VzUuzS6GH2tC9TsRKbneFHaLAoGBAJ7E\nAwotS3cL4U4n75uie54jM3a0aWeAH0I/C31JwqU93AQiDuqupiagcsp1ieWKcZ/f\n3iThJY4GlRpiKgDk+bo5jerDoOy7fGpBdR/1a8Ougjmub1lhkVznjQm8U9G+gvkZ\nV/V520XkBA77U1S4gC6/NlMUJC+Bf9mq5tn03AZhAoGBAODy8Dbkb+lf0O70BeXv\n7Qq+RO4Ky9vEXL6YBUxRpZj/a+ALXoC24fdHsw1XR9N85+Iv2POPiaHERl+lRlC3\npIVd6Art77OPUmkr5ESPL1CMyWlvc2t7yw51sR6t849SCQckFdK6CV7n/wDLaqFb\nOuBx4CqIvjx+Vb1MR8iyx5Wg\n-----END PRIVATE KEY-----\n",
    "client_email": "azure-ocr@mirackcompetitionmeta.iam.gserviceaccount.com",
    "client_id": "116236184866921069317",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/azure-ocr%40mirackcompetitionmeta.iam.gserviceaccount.com"
  }

async function getClient() {

    const client = new ImageAnnotatorClient({
      credentials: tmpkey
    });
    // console.log(tmpkey)
    return client;
  }

async function extractProductInfo(imagePath) {
  try {
    // await getClient();
    const client = await getClient();
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    const text = detections[0].description;

    // Extract product info using regex
    const regex = /^Product: (.+)\nTag line: (.+)\nPrice: (.+)\nSize: (.+)\nSKU: (.+)\nDescription: (.+)$/s;
    const match = text.match(regex);

    if (!match) {
      throw new Error('Failed to extract product info');
    }

    const productInfo = {
      name: match[1],
      tagline: match[2],
      price: match[3],
      size: match[4],
      sku: match[5],
      description: match[6],
    };

    return productInfo;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Example usage
async function main(){
    const imagePath = 'te.png';
    const productInfo = await extractProductInfo(imagePath);

    if (productInfo) {
    console.log(productInfo);
    } else {
    console.log('Failed to extract product info');
    }
}

main()

