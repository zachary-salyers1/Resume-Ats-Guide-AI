import * as pdfjsLib from 'pdfjs-dist';

// Configure the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export async function parseFile(file: File): Promise<string> {
  try {
    const fileType = file.type;
    const buffer = await file.arrayBuffer();

    switch (fileType) {
      case 'application/pdf': {
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        const numPages = pdf.numPages;
        let text = '';
        
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((item: any) => item.str)
            .join(' ');
          text += pageText + '\n';
        }
        
        // Convert plain text to HTML format for Quill
        return text.split('\n\n')
          .map(paragraph => `<p>${paragraph}</p>`)
          .join('\n');
      }

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        try {
          const mammoth = await import('mammoth');
          const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
          return result.value;
        } catch (error) {
          throw new Error('Failed to parse DOCX file. Please ensure the file is not corrupted.');
        }
      }

      case 'text/plain': {
        try {
          const text = new TextDecoder().decode(buffer);
          // Convert plain text to HTML format for Quill
          return text.split('\n\n')
            .map(paragraph => `<p>${paragraph}</p>`)
            .join('\n');
        } catch (error) {
          throw new Error('Failed to parse text file. Please ensure the file contains valid text.');
        }
      }

      default:
        throw new Error('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to parse file. Please try again with a different file.');
  }
}