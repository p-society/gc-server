import 'package:admin/textfield_login.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class LoginPagePlayer extends StatelessWidget {
  const LoginPagePlayer({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(0.0),
          child: Container(
            color: const Color.fromRGBO(20, 22, 42, 1),
            height: double.infinity,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(40.0, 0, 40, 0.0),
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
                        aboveText: 'E-mail', hintText: 'Enter your E-mail'),
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
                          print('Register button clicked');
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
                      height: 20,
                    ),
                    Center(
                      child: Row(
                        children: [
                          const Text(
                            'Already have an account? ',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              fontFamily: 'Open Sans',
                              fontWeight: FontWeight.w500,
                              height: 0,
                            ),
                          ),
                          GestureDetector(
                            onTap: () {
                              print('signup clicked');
                            },
                            child: const Text(
                              'Sign Up',
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
                    ),
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
