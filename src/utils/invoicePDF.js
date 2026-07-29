import jsPDF from 'jspdf';
import { BRAND, DEFAULT_HOSPITAL_SETTINGS, LEGACY_HOSPITAL_SETTINGS } from '../config/brand';

const statusColors = {
  Paid: {
    bg: [209, 250, 229],
    text: [6, 95, 70],
  },
  Unpaid: {
    bg: [254, 226, 226],
    text: [153, 27, 27],
  },
  Partial: {
    bg: [254, 243, 199],
    text: [120, 53, 15],
  },
};

const asText = (value, fallback = '-') => {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value);
};

const formatMoney = (symbol, value) => `${symbol || '$'}${asText(value, '0.00')}`;

const normalizeSetting = (value, defaultValue, legacyValue) => {
  if (value === legacyValue) return defaultValue;
  return asText(value, defaultValue);
};

const drawLogoFallback = (doc, x, y, primary) => {
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x, y, 14, 14, 2, 2, 'F');
  doc.setFillColor(...primary);
  doc.rect(x + 5.5, y + 2, 3, 10, 'F');
  doc.rect(x + 2, y + 5.5, 10, 3, 'F');
};

export function generateInvoicePDF(bill, settings, currencySymbol) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const rightX = pageWidth - margin;

  const hospitalName = normalizeSetting(settings?.hospitalName, DEFAULT_HOSPITAL_SETTINGS.hospitalName, LEGACY_HOSPITAL_SETTINGS.hospitalName);
  const hospitalAddress = asText(settings?.address, DEFAULT_HOSPITAL_SETTINGS.address);
  const hospitalPhone = asText(settings?.phone, DEFAULT_HOSPITAL_SETTINGS.phone);
  const hospitalEmail = normalizeSetting(settings?.email, DEFAULT_HOSPITAL_SETTINGS.email, LEGACY_HOSPITAL_SETTINGS.email);
  const symbol = currencySymbol || '$';

  const primary = [13, 148, 136];
  const textDark = [15, 23, 42];
  const textMuted = [71, 85, 105];
  const textLight = [100, 116, 139];
  const bgLight = [241, 245, 249];
  const border = [226, 232, 240];

  doc.setFillColor(...primary);
  doc.rect(0, 0, pageWidth, 42, 'F');

  try {
    doc.addImage(BRAND.logoUrl, 'PNG', margin, 8, 14, 14);
  } catch {
    drawLogoFallback(doc, margin, 8, primary);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(doc.splitTextToSize(hospitalName, 110)[0], margin + 18, 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Compassionate Care - Advanced Medicine - Trusted Health', margin + 18, 23);

  doc.setFontSize(7.5);
  doc.text(doc.splitTextToSize(`${hospitalAddress} | ${hospitalPhone} | ${hospitalEmail}`, 130), margin + 18, 29);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('INVOICE', rightX, 20, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`# ${asText(bill?.id, 'DRAFT')}`, rightX, 27, { align: 'right' });

  let y = 54;
  const status = asText(bill?.status, 'Unknown');
  const badge = statusColors[status] || { bg: bgLight, text: textDark };

  doc.setFillColor(...badge.bg);
  doc.roundedRect(rightX - 28, 45, 28, 8, 2, 2, 'F');
  doc.setTextColor(...badge.text);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(status.toUpperCase(), rightX - 14, 50.5, { align: 'center' });

  doc.setTextColor(...textLight);
  doc.setFontSize(7.5);
  doc.text('BILL TO', margin, y);

  doc.setTextColor(...textDark);
  doc.setFontSize(11);
  doc.text(doc.splitTextToSize(asText(bill?.patient), 72), margin, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textMuted);
  doc.text('Patient', margin, y + 17);

  const infoRows = [
    ['Invoice Date', asText(bill?.date)],
    ['Invoice No.', asText(bill?.id, 'DRAFT')],
    ['Description', asText(bill?.description, 'Medical Services')],
  ];

  doc.setFontSize(8);
  infoRows.forEach(([label, value], index) => {
    const rowY = y + 7 + index * 7;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textLight);
    doc.text(label, rightX - 60, rowY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textDark);
    doc.text(doc.splitTextToSize(value, 58)[0], rightX, rowY, { align: 'right' });
  });

  y += 32;
  doc.setDrawColor(...border);
  doc.setLineWidth(0.3);
  doc.line(margin, y, rightX, y);
  y += 8;

  doc.setFillColor(...bgLight);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 9, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text('DESCRIPTION', margin + 4, y + 6);
  doc.text('AMOUNT', rightX - 4, y + 6, { align: 'right' });
  y += 14;

  const descriptionLines = doc.splitTextToSize(asText(bill?.description, 'Medical Consultation & Services'), 115);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...textDark);
  doc.text(descriptionLines, margin + 4, y);

  doc.setFont('helvetica', 'bold');
  doc.text(formatMoney(symbol, bill?.amount), rightX - 4, y, { align: 'right' });

  y += Math.max(10, descriptionLines.length * 5);
  doc.setDrawColor(...bgLight);
  doc.setLineWidth(0.2);
  doc.line(margin, y - 4, rightX, y - 4);
  y += 4;

  const boxX = pageWidth / 2;
  const boxW = pageWidth / 2 - margin;
  const totals = [
    ['Subtotal', formatMoney(symbol, bill?.amount)],
    ['Amount Paid', formatMoney(symbol, bill?.paid)],
  ];

  totals.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...textMuted);
    doc.text(label, boxX, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textDark);
    doc.text(value, boxX + boxW, y, { align: 'right' });
    y += 8;
  });

  doc.setFillColor(...primary);
  doc.roundedRect(boxX - 2, y - 5, boxW + 4, 10, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('Balance Due', boxX + 2, y + 1.5);
  doc.text(formatMoney(symbol, bill?.balance), boxX + boxW, y + 1.5, { align: 'right' });
  y += 18;

  doc.setDrawColor(...border);
  doc.setLineWidth(0.3);
  doc.line(margin, y, rightX, y);
  y += 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...textLight);
  doc.text('NOTES', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textMuted);
  doc.text(doc.splitTextToSize(`Thank you for choosing ${hospitalName}. Please retain this invoice for your records.`, 170), margin, y);
  doc.text(doc.splitTextToSize(`For billing queries, contact us at ${hospitalEmail} or call ${hospitalPhone}.`, 170), margin, y + 8);

  doc.setFillColor(...primary);
  doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(doc.splitTextToSize(`${hospitalName} - ${hospitalAddress}`, 170)[0], pageWidth / 2, pageHeight - 7, { align: 'center' });
  doc.text('This is a computer-generated invoice and does not require a signature.', pageWidth / 2, pageHeight - 3, { align: 'center' });

  doc.save(`Invoice-${asText(bill?.id, 'Draft')}.pdf`);
}
