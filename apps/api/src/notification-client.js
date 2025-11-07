const fetch = require('node-fetch');

class NotificationClient {
  constructor(baseUrl = 'http://localhost:5001') {
    this.baseUrl = baseUrl;
  }

  async sendEmail({ to, subject, html, text, attachments = [] }) {
    try {
      const response = await fetch(`${this.baseUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, html, text, attachments }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  async sendMeetingNotification({ members, community, meeting }) {
    try {
      const response = await fetch(`${this.baseUrl}/send-meeting-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members, community, meeting }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send meeting notification:', error);
      throw error;
    }
  }

  async sendMeetingMinutesUpdate({ members, community, meetingMinutes }) {
    try {
      const response = await fetch(`${this.baseUrl}/send-meeting-minutes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members, community, meetingMinutes }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send meeting minutes update:', error);
      throw error;
    }
  }

  async sendWelcomeEmail({ member, community }) {
    try {
      const response = await fetch(`${this.baseUrl}/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ member, community }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }
  }

  async sendTestEmail(email) {
    try {
      const response = await fetch(`${this.baseUrl}/test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send test email:', error);
      throw error;
    }
  }

  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Notification service health check failed:', error);
      return { status: 'error', message: error.message };
    }
  }
}

module.exports = NotificationClient;