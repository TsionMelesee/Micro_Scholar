import 'dart:convert';
import 'package:http/http.dart' as http;

class DonationRepository {
  final String apiUrl = 'http://localhost:3000/donations';

  Future<List<dynamic>> fetchDonations() async {
    final response = await http.get(Uri.parse(apiUrl));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load donations');
    }
  }
}
