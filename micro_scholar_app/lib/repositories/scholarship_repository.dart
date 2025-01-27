import 'dart:convert';
import 'package:http/http.dart' as http;

class ScholarshipRepository {
  final String apiUrl = 'http://localhost:3000/scholarships';

  Future<List<dynamic>> fetchScholarships() async {
    final response = await http.get(Uri.parse(apiUrl));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load scholarships');
    }
  }

  Future<void> createScholarship(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode != 201) {
      throw Exception('Failed to create scholarship');
    }
  }

  Future<void> updateScholarship(String id, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$apiUrl/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to update scholarship');
    }
  }

  Future<void> deleteScholarship(String id) async {
    final response = await http.delete(Uri.parse('$apiUrl/$id'));
    if (response.statusCode != 200) {
      throw Exception('Failed to delete scholarship');
    }
  }
}
