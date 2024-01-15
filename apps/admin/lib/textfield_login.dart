import 'package:flutter/material.dart';

class TextfieldLogin extends StatelessWidget {
  final String aboveText;
  final String hintText;
  const TextfieldLogin(
      {super.key, required this.aboveText, required this.hintText});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(
            height: 8,
          ),
          Text(
            aboveText,
            style: const TextStyle(color: Colors.white),
          ),
          TextField(
            decoration: InputDecoration(
                hintText: hintText,
                filled: true,
                fillColor: Colors.white,
                contentPadding: const EdgeInsets.symmetric(
                    vertical: 10.0, horizontal: 12.0),
                enabledBorder: const OutlineInputBorder(
                    borderSide: BorderSide(color: Color(0xFF9346B7), width: 1)),
                focusedBorder: const OutlineInputBorder(
                    borderSide:
                        BorderSide(color: Color(0xFF9346B7), width: 1))),
            scrollPadding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom + 15 * 4),
          )
        ],
      ),
    );
  }
}
