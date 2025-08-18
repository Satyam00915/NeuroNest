export default function generateUsername(email: string) {
  return email.split("@")[0] + "_" + Math.floor(Math.random() * 10000);
}
