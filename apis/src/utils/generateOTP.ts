export default function (length: number = 6) {

  const OTP = Math.random() * (10 ** length);
  console.log(Math.floor(OTP));
  return Math.floor(OTP);
}