/**
 * Utilidades de Seguridad y Sanitización para Formularios y Entradas de Usuario
 * Prevención contra XSS (Cross-Site Scripting), Inyecciones de Código y DoS de Carga Útil.
 */

/**
 * Sanitiza una cadena de texto eliminando etiquetas HTML peligrosas,
 * scripts y caracteres de control potencialmente maliciosos.
 */
export function sanitizeText(input: string, maxLength: number = 2000): string {
  if (!input || typeof input !== 'string') return '';

  let sanitized = input
    // Truncar longitud para evitar ataques de DoS por payloads masivos
    .slice(0, maxLength)
    // Eliminar caracteres de control no imprimibles (excepto saltos de línea y tabuladores)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Eliminar etiquetas HTML completas
    .replace(/<[^>]*>/g, '')
    // Eliminar posibles vectores javascript: o data:
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    // Eliminar manejadores de eventos (onload=, onerror=, etc.)
    .replace(/on\w+\s*=/gi, '');

  return sanitized.trim();
}

/**
 * Escapa caracteres HTML especiales para renderizado seguro si se requiere texto plano estricto.
 */
export function escapeHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return input.replace(/[&<>"'/]/g, (match) => map[match] || match);
}

/**
 * Valida y sanitiza una dirección de correo electrónico.
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return '';
  const trimmed = email.trim().toLowerCase().slice(0, 150);
  // Eliminar saltos de línea para prevenir inyección de cabeceras en correos
  return trimmed.replace(/[\r\n\t]/g, '');
}

/**
 * Comprueba si un correo tiene formato válido RFC.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Sanitiza números telefónicos permitiendo solo caracteres válidos (+, dígitos, guiones, espacios, paréntesis).
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/[^\d\s+\-()]/g, '').trim().slice(0, 30);
}

/**
 * Sanitiza identificadores numéricos o alfanuméricos simples (como cédulas o códigos de pedido).
 */
export function sanitizeAlphaNumeric(input: string, maxLength: number = 50): string {
  if (!input || typeof input !== 'string') return '';
  return input.replace(/[^a-zA-Z0-9-_]/g, '').slice(0, maxLength);
}
