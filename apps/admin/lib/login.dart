import 'package:admin/textfield_login.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  // void _onButtonPressed() {
  //   // Add your button press logic here
  //   print('TextButton pressed');
  // }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Expanded(
          child: Container(
            //width: double.infinity,
            // width: MediaQuery.of(context).size.width,
            // height: MediaQuery.of(context).size.height,
            //  height: double.infinity,
            color: const Color.fromRGBO(20, 22, 42, 1),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(40.0, 0, 40, 57.0),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(
                      height: 70,
                    ),
                    const Text(
                      'Create your Account',
                      style: TextStyle(
                        color: Color(0xFFE0DADD),
                        fontSize: 28,
                        fontFamily: 'Open Sans',
                        fontWeight: FontWeight.w800,
                        height: 0,
                      ),
                    ),
                    const Text(
                      'Fill in the details to create your account',
                      style: TextStyle(
                        color: Color(0xFFBAAFBB),
                        fontSize: 16,
                        fontFamily: 'Poppins',
                        fontWeight: FontWeight.w500,
                        height: 0,
                      ),
                    ),
                    const SizedBox(
                      height: 18,
                    ),
                    const Padding(
                      padding: EdgeInsets.fromLTRB(50, 8, 50, 8),
                      child: Image(
                          image: AssetImage(
                              'assets/images/sports_illustration_gCSB.png')),
                    ),
                    const SizedBox(height: 20),
                    const TextfieldLogin(
                        aboveText: 'Name', hintText: 'Enter your Name'),
                    const TextfieldLogin(
                        aboveText: 'E-mail', hintText: 'Enter your E-mail'),
                    const TextfieldLogin(
                        aboveText: 'Phone Number',
                        hintText: 'Enter your phone number'),
                    const TextfieldLogin(
                        aboveText: 'Password', hintText: 'Enter your password'),
                    const SizedBox(
                      height: 20,
                    ),
                    SizedBox(
                      width: 320,
                      child: TextButton(
                        onPressed: () {
                          // _onButtonPressed();
                        },
                        style: TextButton.styleFrom(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(
                                  10.0), // Adjust the radius as needed
                            ),
                            backgroundColor:
                                const Color.fromRGBO(225, 25, 109, 1)),
                        child: const Text(
                          'Register',
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    const Center(
                      child: Text.rich(
                        TextSpan(
                          children: [
                            TextSpan(
                              text: 'Already have an account? ',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 15,
                                fontFamily: 'Open Sans',
                                fontWeight: FontWeight.w500,
                                height: 0,
                              ),
                            ),
                            TextSpan(
                              text: 'Sign Up',
                              style: TextStyle(
                                color: Color(0xFFC01A60),
                                fontSize: 15,
                                fontFamily: 'Open Sans',
                                fontWeight: FontWeight.w500,
                                height: 0,
                              ),
                            ),
                          ],
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    // const SizedBox(
                    //   height: 56,
                    // )
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
