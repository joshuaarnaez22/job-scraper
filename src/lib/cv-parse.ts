/**
 * Extract plain text from CV buffers (PDF / DOCX)
 */

import mammoth from 'mammoth';
import { extractText, getDocumentProxy } from 'unpdf';

export async function extractTextFromCv(options: {
  buffer: Buffer;
  contentType?: string | null;
  fileName?: string | null;
}): Promise<string> {
  const type = (options.contentType || '').toLowerCase();
  const name = (options.fileName || '').toLowerCase();

  const isPdf = type.includes('pdf') || name.endsWith('.pdf');
  const isDocx =
    type.includes('wordprocessingml') ||
    type.includes('officedocument') ||
    name.endsWith('.docx');
  const isDoc = type === 'application/msword' || name.endsWith('.doc');

  if (isPdf) {
    const pdf = await getDocumentProxy(new Uint8Array(options.buffer));
    const result = await extractText(pdf, { mergePages: true });
    return (typeof result.text === 'string' ? result.text : '').trim();
  }

  if (isDocx) {
    const result = await mammoth.extractRawText({ buffer: options.buffer });
    return (result.value || '').trim();
  }

  if (isDoc) {
    throw new Error(
      'Legacy .doc files are not supported. Please upload a PDF or .docx.'
    );
  }

  throw new Error('Unsupported CV type. Upload a PDF or .docx file.');
}
