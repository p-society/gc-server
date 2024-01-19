import 'package:admin/login_admin.dart';
import 'package:flutter/material.dart';
import 'package:pinput/pinput.dart';

class OtpPage extends StatefulWidget {
  const OtpPage({super.key});

  @override
  State<OtpPage> createState() => _OtpPageState();
}

class _OtpPageState extends State<OtpPage> {
  late TextEditingController otpController;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    otpController = TextEditingController();
  }

  void navController() {
    Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => LoginPageAdmin()));
  }

  @override
  Widget build(BuildContext context) {
    final defaultPinTheme = PinTheme(
      width: 56,
      height: 56,
      textStyle: const TextStyle(
          fontSize: 20, color: Colors.white, fontWeight: FontWeight.w600),
      decoration: BoxDecoration(
        border: Border.all(color: const Color.fromRGBO(234, 239, 243, 1)),
        borderRadius: BorderRadius.circular(20),
      ),
    );

    final focusedPinTheme = defaultPinTheme.copyDecorationWith(
      border: Border.all(color: const Color.fromRGBO(114, 178, 238, 1)),
      borderRadius: BorderRadius.circular(8),
    );

    final submittedPinTheme = defaultPinTheme.copyWith(
      decoration: defaultPinTheme.decoration?.copyWith(
          // color: Color.fromRGBO(234, 239, 243, 1),
          ),
    );

    return Scaffold(
      body: Container(
        height: double.infinity,
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            //aplying gradient
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF111114),
              Color(0xFF161A3A),
              Color(0xFF171D45),
            ],
          ),
        ),
        child: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(
                height: 255,
              ),
              const Text(
                'Enter code send to your E-mail',
                style: TextStyle(
                  color: Color(0xFFE1DADE),
                  fontSize: 25,
                  fontFamily: 'Open Sans',
                  fontWeight: FontWeight.w700,
                  height: 0,
                ),
              ),
              const SizedBox(
                height: 12,
              ),
              const Text(
                'We have sent the code to abc@gmail.com',
                style: TextStyle(
                  color: Color(0xFFD3CFCF),
                  fontSize: 15,
                  fontFamily: 'Open Sans',
                  fontWeight: FontWeight.w500,
                  height: 0,
                ),
              ),
              const SizedBox(
                height: 43,
              ),
              Pinput(
                defaultPinTheme: defaultPinTheme,
                focusedPinTheme: focusedPinTheme,
                submittedPinTheme: submittedPinTheme,
                controller: otpController,
                validator: (s) {
                  if (s == '2222') {
                    navController();
                    return '';
                  } else {
                    otpController.text = '';
                    return 'OTP is incorrect';
                  }
                },
                closeKeyboardWhenCompleted: true,
                pinputAutovalidateMode: PinputAutovalidateMode.onSubmit,
                showCursor: true,
                onCompleted: (pin) => navController,
              ),
              const SizedBox(
                height: 30,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Didn\'t recieve the code?  ',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 15,
                      fontFamily: 'Open Sans',
                      fontWeight: FontWeight.w500,
                      height: 0,
                    ),
                  ),
                  GestureDetector(
                    //making signup text clickabe
                    onTap: () {
                      //print('signup clicked');
                    },
                    child: const Text(
                      'Resend',
                      style: TextStyle(
                        color: Color(0xFFC01A60),
                        fontSize: 15,
                        fontFamily: 'Open Sans',
                        fontWeight: FontWeight.w500,
                        height: 0,
                      ),
                    ),
                  )
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
