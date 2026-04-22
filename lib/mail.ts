import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * 📧 SEND WELCOME EMAIL
 * Sends a premium-designed welcome email to new subscribers.
 */
export const sendWelcomeEmail = async (email: string) => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("⚠️ SendGrid API Key missing. Skipping email.");
    return;
  }

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'no-reply@hgwvault.com',
    subject: 'Welcome to the HGW Legend Vault 🏆',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Outfit:wght@300;400;600&display=swap');
          body { font-family: 'Outfit', sans-serif; background-color: #080C14; color: #E7EBEF; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #0D1424; border: 1px solid #1E293B; border-radius: 24px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #0B1121 0%, #080C14 100%); padding: 40px; text-align: center; border-bottom: 1px solid #1E293B; }
          .content { padding: 40px; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #7B899D; border-top: 1px solid #1E293B; background: #080C14; }
          h1 { font-family: 'Orbitron', sans-serif; font-weight: 900; color: #FFFFFF; letter-spacing: 2px; margin: 0; font-size: 24px; }
          .highlight { color: #00D4FF; }
          p { line-height: 1.6; color: #7B899D; font-size: 16px; }
          .button { display: inline-block; background: #00D4FF; color: #0B0F19 !important; font-family: 'Orbitron', sans-serif; font-weight: 900; padding: 16px 32px; border-radius: 12px; text-decoration: none; margin-top: 24px; text-transform: uppercase; letter-spacing: 1px; font-size: 13px; box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
          .stats { display: flex; gap: 20px; margin-top: 30px; padding-top: 30px; border-top: 1px solid #1E293B; }
          .stat-item { flex: 1; text-align: center; }
          .stat-value { color: #FFFFFF; font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 18px; display: block; }
          .stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #00D4FF; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://hgw-vault.vercel.app/logo.png" alt="HGW Logo" width="120" style="margin-bottom: 20px;">
            <h1>WELCOME TO THE <span class="highlight">VAULT</span></h1>
          </div>
          <div class="content">
            <p>Greetings Legend,</p>
            <p>You have successfully entered the <strong>HGW Legend Vault</strong>. You are now part of an elite community dedicated to the definitive analysis and ranking of the greatest figures in sport and culture.</p>
            
            <p>Every week, we'll send you deep-dives into legend metrics, exclusive rankings updates, and the stories behind the HGW Domination Index.</p>
            
            <div style="text-align: center;">
              <a href="https://hgw-vault.vercel.app/leaderboard" class="button">Explore the Leaderboard</a>
            </div>

            <div class="stats">
              <div class="stat-item">
                <span class="stat-value">15K+</span>
                <span class="stat-label">Legends</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">10</span>
                <span class="stat-label">Metrics</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">#1</span>
                <span class="stat-label">Ranking</span>
              </div>
            </div>
          </div>
          <div class="footer">
            &copy; 2026 HGW Legend Vault. All rights reserved.<br>
            You are receiving this because you subscribed at hgwvault.com
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Welcome email sent to ${email}`);
  } catch (error: any) {
    console.error("❌ SendGrid Error:", error.response?.body || error.message);
  }
};
