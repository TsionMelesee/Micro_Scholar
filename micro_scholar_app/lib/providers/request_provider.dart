import 'package:flutter/material.dart';
import '../models/request_model.dart';
import '../repositories/request_repository.dart';

class RequestProvider with ChangeNotifier {
  RequestRepository _requestRepository = RequestRepository();
  List<Request> _requests = [];

  List<Request> get requests => _requests;

  Future<void> loadRequests() async {
    try {
      _requests = await _requestRepository.fetchRequests();
      notifyListeners();
    } catch (e) {
      print('Error loading requests: $e');
    }
  }
}
