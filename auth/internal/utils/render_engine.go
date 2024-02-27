package utils

func RenderEngine(OTP int) string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grand Championship Sports Fest OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, p {
            margin: 0 0 20px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>In order to finalize your participation and confirm your registration for the Grand Championship Sports Fest, we require you to undergo a one-time verification process. This verification will be conducted through the use of a unique One-Time Password (OTP) sent to your registered email address.</p>
        <p><strong>This is your OTP: ` + string(OTP) + `</strong></p>
        <p>Please note that this OTP is valid for 5 minutes. Kindly complete the verification process within this timeframe to ensure successful registration.</p>

        <!-- Footer -->
        <div style="margin-top: 20px; text-align: center;">
            <img src="https://media.licdn.com/dms/image/C510BAQFpxyHUatuOvA/company-logo_200_200/0/1630569018702/p_soc_logo?e=1717027200&v=beta&t=8zgvl2h1i6ORVp9JQTbhG-lXwFVLuif-v1V0CnJp6Hc" alt="P-Society IIIT-Bh Logo" style="max-width: 100px;">
            <p>Open Source Software Wing, Programming Society, IIIT-Bh</p>
        </div>
    </div>
</body>
</html>
`
}
