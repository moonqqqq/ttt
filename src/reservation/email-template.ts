import { ReservationReceipt } from '@prisma/client';
import { LANGUAGE, LANGUAGE_TYPE } from '../shared/constants/language';

export function testTemplate(
  receipt: ReservationReceipt,
  model,
  language: LANGUAGE_TYPE = LANGUAGE.KO,
) {
  const userName = (receipt.user as any).name;
  const modelName = model.name;
  const email = (receipt.user as any)?.email;
  const options = language == LANGUAGE.EN ? receipt.options : receipt.optionsKO;
  const title =
    language == LANGUAGE.KO
      ? `축하합니다. <br>${userName}님의 ${modelName}모델이 완성되었습니다.`
      : `Congratulations!<br>${userName}’s ${modelName} model has been completed.`;

  const modelImageURL = `https://spacewavy.s3.ap-northeast-2.amazonaws.com/${model.imageURL}`;
  const subtitle =
    language == LANGUAGE.KO
      ? `${email} 로 견적서를 보냈습니다.`
      : `A quotation was sent to ${email}.`;

  let optionHTML = '';
  for (const [key, value] of Object.entries(options)) {
    optionHTML += `
            <div style="display: flex; justify-content: space-between;">
                <p class="option-details" style="line-height: 24px; font-weight: 100; margin-right: auto;">${key}</p>
                <p class="option-details" style="line-height: 24px; font-weight: 100;">${value}</p>
            </div>`;
  }

  //   const totalPrice = receipt.totalPrice;
  const totalPrice =
    language == LANGUAGE.KO
      ? `${receipt.totalPrice.toLocaleString('ko-KR')}원`
      : `${receipt.totalPrice.toLocaleString('ko-KR')}₩`;
  const totalPriceKey =
    language == LANGUAGE.KO ? `예상 견적` : 'Estimated quote';

  return `<!DOCTYPE html>
    <html lang="en" style="padding: 0; margin: 0; font-family: 'Apple SD Gothic Neo';">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wavyroom receipt</title>
    </head>
    
    <body style="padding: 0; margin: 0; font-family: 'Apple SD Gothic Neo';">
        <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
        <header style="background: #000; align-items: center; padding-top: 32px; padding-bottom: 12px; text-align: center; justify-content: center;">
            <div class="links" style="margin-left: auto; margin-right: auto; margin-bottom: 16px;">
                <span class="link-item" style="display: inline-block;">
                    <img width="23.12" height="24"
                        src="https://spacewavy.s3.ap-northeast-2.amazonaws.com/Vector+(2).png"
                        alt="mail">
                </span>
            </div>
        </header>
        <main style="margin: 40px 60px; max-width: 600px;">
            <p class="heading" style="font-family: 'Apple SD Gothic Neo'; font-style: normal; font-weight: 300; margin-top: 52px; line-height: 130%; text-align: center; font-size: 40px;">${title}
            </p>
    
            <p style="text-align: center; font-family: 'Apple SD Gothic Neo'; font-style: normal; font-weight: 300; font-size: 16px;">${subtitle}</p>
    
            <div style="text-align: center;">
                <img height="273" width: 600px; 
                    src=${modelImageURL}>
            </div>
    
            <br><br/>
    
            <hr />
    
            ${optionHTML}
            
            <br><br/>
            <hr />
            <div style="display: flex; justify-content: space-between;">
                <p style="line-height: 24px; font-weight: 100; margin-right: auto;">${totalPriceKey}</p>
                <p style="line-height: 24px; font-weight: 100;">${totalPrice}</p>
            </div>
    
            </p>
        </main>
    </body>
    
    <style>
        @font-face {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 400;
            src: local('Apple SD Gothic Neo Medium'),
                url('https://cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/fonts/400_AppleSDGothicNeo-Medium.woff2') format('woff2'),
                url('https://cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/fonts/400_AppleSDGothicNeo-Medium.otf') format('opentype');
        }
    
        @font-face {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 500;
            src: local('Apple SD Gothic Neo Regular'),
                url('https://cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/fonts/500_AppleSDGothicNeo-Regular.woff2') format('woff2'),
                url('https://cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/fonts/500_AppleSDGothicNeo-Regular.otf') format('opentype');
        }
    
        @font-face {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 700;
            src: local('Apple SD Gothic Neo Bold'),
                url('https://cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/fonts/700_AppleSDGothicNeo-Bold.woff2') format('woff2'),
                url('https://cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/fonts/700_AppleSDGothicNeo-Bold.otf') format('opentype');
        }
    
        @font-face {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 800;
            src: local('Apple SD Gothic Neo ExtraBold'),
                url('https://cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/fonts/800_AppleSDGothicNeo-ExtraBold.woff2') format('woff2'),
                url('https://cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/fonts/800_AppleSDGothicNeo-ExtraBold.otf') format('opentype');
        }
    </style>
    
    
    </html>`;
}
