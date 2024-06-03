
const QRCode = require('qrcode');
const Jimp = require('jimp');


const createQRCode = async (payload, color = "#000000") => {
    try {
        const text = JSON.stringify(payload);
        const qrImage = await QRCode.toDataURL(text);
        const qrCode = await Jimp.read(Buffer.from(qrImage.split(",")[1], 'base64'));
        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        const image = new Jimp(qrCode.bitmap.width, qrCode.bitmap.height + 30, 'white');
        
        image.composite(qrCode, 0, 0);
        image.print(font, 0, qrCode.bitmap.height, {
            text: `${payload.cpid}-${payload.connectorId}`,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_TOP
        }, image.bitmap.width);

        return new Promise((resolve, reject) => {
            image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    const dataUrl = `data:${Jimp.MIME_PNG};base64,${buffer.toString('base64')}`;
                    resolve(dataUrl);
                }
            });
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Failed to generate QR code');
    }
};



module.exports = createQRCode;