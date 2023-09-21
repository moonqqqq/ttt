import { registerAs } from '@nestjs/config';

export default registerAs('util', () => ({
  // OTP stuff
  // otpSentMaxCount: 5,
  // Kakao API
  // kakaoApiUserAccessKeyId: process.env.KAKAO_AUTH_USER_ACCESS_KEY_ID,
  // kakaoApiUserAccessAuthKey: process.env.KAKAO_AUTH_USER_ACCESS_AUTH_KEY,
  // kakaoApiGetTokenUrl: process.env.KAKAO_AUTH_TOKEN_API,
  // kakaoFileUploadUrl: process.env.KAKAO_FILE_UPLOAD_URL,
  // File storage
  // filePathImage: process.env.FILE_UPLOAD_PATH_IMAGE,
  // filePathCertificate: process.env.FILE_UPLOAD_PATH_CERTIFICATE,
  // filePathAttachment: process.env.FILE_UPLOAD_PATH_ATTACHMENT,
}));
