const Mailjet = require('node-mailjet');

export const sendVerificationMail = (receiver, code) => {
    return new Promise(async (resolve, reject) => {
        const mailjet = new Mailjet({
            apiKey: process.env.MAILJET_API_KEY,
            apiSecret: process.env.MAILJET_SECRET_KEY,
        });

        const result = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: { Email: "verification@nextdemo.xyz", Name: "NextDemo" },
                        To: [{ Email: receiver.toLowerCase(), Name: receiver.toLowerCase() }],
                        Subject: "Email verification",
                        TextPart: `Your verification code is: ${code}`,
                        HTMLPart: `<p>Your verification code is: ${code}</p>`
                    }
                ]
            });

        if (result.body.Messages[0].Status === 'success') {
            resolve();
        }
        else {
            reject();
        }
    })
}