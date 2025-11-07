const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.NOTIFICATION_PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Email transporter configuration
const createTransporter = () => {
  if (process.env.EMAIL_PROVIDER === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password for Gmail
      },
    });
  } else if (process.env.EMAIL_PROVIDER === 'smtp') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Development mode - use Ethereal email for testing
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass'
      }
    });
  }
};

const transporter = createTransporter();

// Email service class
class EmailService {
  static async sendEmail({ to, subject, html, text, attachments = [] }) {
    try {
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@lembow.com',
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        text,
        attachments,
      };

      const info = await transporter.sendMail(mailOptions);
      
      console.log('✅ Email sent successfully:', {
        messageId: info.messageId,
        to: mailOptions.to,
        subject: mailOptions.subject,
      });

      return {
        success: true,
        messageId: info.messageId,
        info,
      };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }

  static async sendMeetingNotification({ members, community, meeting }) {
    const subject = `📅 Upcoming Meeting: ${meeting.title}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">📅 Meeting Notification</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">${meeting.title}</h2>
          
          <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p><strong>Community:</strong> ${community.name}</p>
            <p><strong>Date:</strong> ${new Date(meeting.date).toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p><strong>Time:</strong> ${meeting.time || 'TBA'}</p>
            <p><strong>Location:</strong> ${meeting.location || community.meetingLocation || 'TBA'}</p>
            
            ${meeting.agenda ? `
            <div style="margin-top: 20px;">
              <h3 style="color: #667eea;">📋 Agenda</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
                ${meeting.agenda.split('\n').map(item => `<p style="margin: 5px 0;">• ${item}</p>`).join('')}
              </div>
            </div>
            ` : ''}
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:3000/c/${community.slug}/meetings" 
               style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
              View Meeting Details
            </a>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            Best regards,<br>
            The ${community.name} Team
          </p>
        </div>
      </div>
    `;

    const emailPromises = members.map(member => 
      this.sendEmail({
        to: member.email,
        subject,
        html,
      })
    );

    return Promise.allSettled(emailPromises);
  }

  static async sendMeetingMinutesUpdate({ members, community, meetingMinutes }) {
    const subject = `📝 Meeting Minutes Available: ${meetingMinutes.title}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">📝 Meeting Minutes</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">${meetingMinutes.title}</h2>
          
          <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p><strong>Community:</strong> ${community.name}</p>
            <p><strong>Meeting Date:</strong> ${new Date(meetingMinutes.meetingDate).toLocaleDateString('en-GB')}</p>
            
            ${meetingMinutes.keyDecisions ? `
            <div style="margin-top: 20px;">
              <h3 style="color: #4facfe;">✅ Key Decisions</h3>
              <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
                ${meetingMinutes.keyDecisions.split('\n').map(item => `<p style="margin: 5px 0;">• ${item}</p>`).join('')}
              </div>
            </div>
            ` : ''}
            
            ${meetingMinutes.actionItems ? `
            <div style="margin-top: 20px;">
              <h3 style="color: #ff6b6b;">🎯 Action Items</h3>
              <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
                ${meetingMinutes.actionItems.split('\n').map(item => `<p style="margin: 5px 0;">• ${item}</p>`).join('')}
              </div>
            </div>
            ` : ''}
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:3000/c/${community.slug}/meetings" 
               style="background: #4facfe; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
              Read Full Minutes
            </a>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            Stay connected with ${community.name}
          </p>
        </div>
      </div>
    `;

    const emailPromises = members.map(member => 
      this.sendEmail({
        to: member.email,
        subject,
        html,
      })
    );

    return Promise.allSettled(emailPromises);
  }

  static async sendWelcomeEmail({ member, community }) {
    const subject = `🎉 Welcome to ${community.name}!`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Welcome!</h1>
        </div>
        
        <div style="padding: 40px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${member.name}!</h2>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; line-height: 1.6;">
              Welcome to <strong>${community.name}</strong>! We're excited to have you as part of our community.
            </p>
            
            <div style="margin: 25px 0;">
              <h3 style="color: #667eea;">🏟️ About Our Community</h3>
              <p style="line-height: 1.6;">${community.description || 'A vibrant community bringing people together through sports and activities.'}</p>
            </div>
            
            <div style="margin: 25px 0;">
              <h3 style="color: #667eea;">📅 Meeting Information</h3>
              <p><strong>Schedule:</strong> ${community.meetingSchedule || 'Check community page for updates'}</p>
              <p><strong>Location:</strong> ${community.meetingLocation || 'TBA'}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:3000/c/${community.slug}" 
               style="background: #667eea; color: white; padding: 15px 35px; text-decoration: none; border-radius: 25px; display: inline-block; margin: 10px;">
              Visit Community Page
            </a>
            <a href="http://localhost:3000/dashboard" 
               style="background: #28a745; color: white; padding: 15px 35px; text-decoration: none; border-radius: 25px; display: inline-block; margin: 10px;">
              Go to Dashboard
            </a>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 25px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            Questions? Contact us at <a href="mailto:support@lembow.com" style="color: #667eea;">support@lembow.com</a>
          </p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: member.email,
      subject,
      html,
    });
  }
}

// Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'notification-service',
    timestamp: new Date().toISOString(),
    emailProvider: process.env.EMAIL_PROVIDER || 'development'
  });
});

// Send individual email
app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, html, text, attachments } = req.body;
    
    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        error: 'Missing required fields: to, subject, and either html or text'
      });
    }

    const result = await EmailService.sendEmail({ to, subject, html, text, attachments });
    res.json(result);
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send meeting notification
app.post('/send-meeting-notification', async (req, res) => {
  try {
    const { members, community, meeting } = req.body;
    
    if (!members || !community || !meeting) {
      return res.status(400).json({
        error: 'Missing required fields: members, community, meeting'
      });
    }

    const results = await EmailService.sendMeetingNotification({ members, community, meeting });
    res.json({ results, total: results.length });
  } catch (error) {
    console.error('Send meeting notification error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send meeting minutes update
app.post('/send-meeting-minutes', async (req, res) => {
  try {
    const { members, community, meetingMinutes } = req.body;
    
    if (!members || !community || !meetingMinutes) {
      return res.status(400).json({
        error: 'Missing required fields: members, community, meetingMinutes'
      });
    }

    const results = await EmailService.sendMeetingMinutesUpdate({ members, community, meetingMinutes });
    res.json({ results, total: results.length });
  } catch (error) {
    console.error('Send meeting minutes error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send welcome email
app.post('/send-welcome-email', async (req, res) => {
  try {
    const { member, community } = req.body;
    
    if (!member || !community) {
      return res.status(400).json({
        error: 'Missing required fields: member, community'
      });
    }

    const result = await EmailService.sendWelcomeEmail({ member, community });
    res.json(result);
  } catch (error) {
    console.error('Send welcome email error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Email webhook endpoint for receiving emails
app.post('/webhook/email', async (req, res) => {
  try {
    console.log('📧 Incoming email webhook:', req.body);
    
    // Process incoming email
    const { from, to, subject, text, html, attachments } = req.body;
    
    // Here you can add logic to:
    // 1. Parse email content
    // 2. Extract meeting RSVPs
    // 3. Process community updates
    // 4. Handle replies to notifications
    
    res.json({ 
      status: 'received', 
      message: 'Email processed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Email webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test email endpoint (for development)
app.post('/test-email', async (req, res) => {
  try {
    const testEmail = await EmailService.sendEmail({
      to: req.body.email || 'test@example.com',
      subject: '🧪 Lembow Notification Service Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>🧪 Test Email Successful!</h2>
          <p>This is a test email from the Lembow notification service.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Service Status:</strong> ✅ Operational</p>
        </div>
      `,
    });

    res.json({ 
      success: true, 
      message: 'Test email sent successfully',
      result: testEmail 
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Notification Service running on http://localhost:${PORT}`);
  console.log(`📧 Email provider: ${process.env.EMAIL_PROVIDER || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;