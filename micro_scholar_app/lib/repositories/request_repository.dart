import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/request_model.dart';

class RequestRepository {
  final String apiUrl = 'http://localhost:3000/scholarships';

  Future<List<Request>> fetchRequests() async {
    final response = await http.get(Uri.parse(apiUrl));

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((request) => Request.fromJson(request)).toList();
    } else {
      throw Exception('Failed to load requests');
    }
  }
}
