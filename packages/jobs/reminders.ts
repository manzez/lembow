// Stubs for reminders processors (BullMQ)
export async function processDuesReminder(job: any) {
  const { memberId, periodLabel } = job.data
  console.log('Send dues reminder to member', memberId, periodLabel)
  // TODO: call WhatsApp/Email providers
}
