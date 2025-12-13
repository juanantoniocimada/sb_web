

// src/utils.ts
export function extractTimeFromISO(isoString: string): string {
  // Convertir la cadena a un objeto Date
  const date = new Date(isoString);

  // Extraer la hora, minutos y segundos
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Formatear la hora como HH:MM:SS
  return `${hours}:${minutes}:${seconds}`;
}

export function getDayOfWeekFromISO(isoString: string): string {
  // Convertir la cadena a un objeto Date
  const date = new Date(isoString);

  // Array de días de la semana en inglés
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  // Obtener el número del día de la semana (0-6)
  const dayIndex = date.getDay();

  // Obtener el nombre del día de la semana a partir del índice
  return daysOfWeek[dayIndex];
}
