export default async function sendMail(email: string, OTP: number) {
  const mailUri = 'http://127.0.0.1:6969/v0/mails';
  const postData = {
    'subject': 'Grand Championship Player Verification',
    'content': OTP.toString(),
    'to': [email],
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData) // Convert the data object to a JSON string
  };

  await fetch(mailUri, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON response
    });
}