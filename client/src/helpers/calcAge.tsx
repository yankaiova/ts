export function calcAge(dateOfBorn: string) {
  const diff = new Date(Date.now() - Date.parse(dateOfBorn));
  return Math.abs(diff.getUTCFullYear() - 1970);
}
