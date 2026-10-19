export interface ContactDraftInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function createContactMailto(input: ContactDraftInput): string {
  const subject = `[ToolForge ${input.subject}] ${input.name ? `from ${input.name}` : ''}`;
  const body = `Name: ${input.name || 'Not provided'}\nEmail: ${input.email}\nTopic: ${input.subject}\n\nMessage:\n${input.message}`;
  return `mailto:arnavsinghas1221@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function createContactCopyText(input: ContactDraftInput): string {
  return `To: arnavsinghas1221@gmail.com\nSubject: [ToolForge ${input.subject}]${input.name ? ` from ${input.name}` : ''}\n\nName: ${input.name || 'Not provided'}\nEmail: ${input.email}\nTopic: ${input.subject}\n\nMessage:\n${input.message}`;
}
