import 'package:admin/textfield_login.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class LoginPageAdmin extends StatelessWidget {
  const LoginPageAdmin({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Expanded(
          child: Container(
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
                    AspectRatio(
                      aspectRatio: 16 / 9,
                      child: Image(
                          image: AssetImage(
                              'assets/images/sports_illustration_gCSB.png')),
                    ),
                    const SizedBox(height: 20),
                    const TextfieldLogin(
                        aboveText: 'Name',
                        hintText: 'Enter your Name'), //TextField for name
                    const TextfieldLogin(
                        aboveText: 'E-mail',
                        hintText: 'Enter your E-mail'), //TextField for email
                    const TextfieldLogin(
                        aboveText: 'Phone Number',
                        hintText:
                            'Enter your phone number'), //TextField for phone number
                    const TextfieldLogin(
                        aboveText: 'Password',
                        hintText:
                            'Enter your password'), //TextField for password
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
                            //making signup text clickable
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
