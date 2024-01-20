import 'package:admin/textfield_login.dart';
import 'package:flutter/material.dart';

class SignUpPage extends StatelessWidget {
  const SignUpPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: Padding(
        padding: const EdgeInsets.all(0.0),
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
          child: Column(
            children: [
              const SizedBox(
                height: 220,
              ),
              Expanded(
                child: Container(
                  height: double.infinity,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(40.0, 0, 40, 0.0),
                    child: SingleChildScrollView(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          // const SizedBox(
                          //   height: 70,
                          // ),
                          const Text(
                            'SIGN IN',
                            style: TextStyle(
                              color: Color(0xFFE0DADD),
                              fontSize: 28,
                              fontFamily: 'Open Sans',
                              fontWeight: FontWeight.w800,
                              height: 0,
                            ),
                          ),

                          const SizedBox(
                            height: 18,
                          ),

                          const SizedBox(height: 20),
                          const TextfieldLogin(
                              aboveText: 'E-mail',
                              hintText:
                                  'Enter your E-mail'), //TextField for email
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
                              //Register button
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
                                'Sign In',
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
                                  'Don\'t have an account? ',
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
                                    print('signup clicked');
                                  },
                                  child: const Text(
                                    'Register Now',
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
              const SizedBox(
                height: 10,
              ),
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: Image.asset(
                  'assets/images/bg_design_gCSB.png', // Replace with the path to your image asset
                  fit: BoxFit.cover,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
