export const emailTemp = (name: String, otp: number, email: string) => {
  return `<!-- Replace {{name}} and {{otp}} when sending -->
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Inter, Roboto, Arial, sans-serif; background:#f6f8fb; padding:24px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(12,20,40,0.08);">
                <!-- Header / Logo -->
                <tr>
                  <td style="padding:22px 28px; text-align:left; background:linear-gradient(90deg,#3b82f6,#06b6d4); color:#fff;">
                    <h1 style="margin:0; font-size:18px; font-weight:600;">NeuroNST</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:28px;">
                    <p style="margin:0 0 12px 0; color:#0b1220; font-size:16px;">
                      Hi <strong>${name}</strong>,
                    </p>

                    <p style="margin:0 0 18px 0; color:#344054; font-size:15px; line-height:1.5;">
                      Use the code below to continue. This code is valid for <strong>5 minutes</strong>. Do not share this code with anyone.
                    </p>

                    <!-- OTP box -->
                    <div style="margin:18px 0; text-align:center;">
                      <div style="display:inline-block; padding:18px 26px; border-radius:12px; background:#f1f5f9;">
                        <span style="font-size:28px; letter-spacing:4px; font-weight:700; color:#0b1220; font-family: 'Courier New', Courier, monospace;">
                          ${otp}
                        </span>
                      </div>
                    </div>

                    <p style="margin:0 0 18px 0; color:#475569; font-size:14px;">
                      If you didn't request this code, you can safely ignore this email. For help, reply to this email or contact support.
                    </p>

                    <hr style="border:none; border-top:1px solid #eef2f7; margin:18px 0;" />

                    <p style="margin:0; font-size:12px; color:#9aa4b2;">
                      This email was sent to <em>${email}</em>. If you didn't ask for it, no action is required.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:14px 20px; background:#f8fafc; text-align:center;">
                    <small style="color:#9aa4b2; font-size:12px;">
                      © NeuroNST — Your security matters.
                    </small>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>`;
};
