import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthRepository {
  final String apiUrl = 'http://localhost:3000/auth';

  Future<void> register(String name, String email, String password) async {
    final response = await http.post(
      Uri.parse('$apiUrl/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': name, 'email': email, 'password': password}),
    );
    if (response.statusCode != 201) {
      throw Exception('Failed to register');
    }
  }

  Future<void> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$apiUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to login');
    }
  }
}
