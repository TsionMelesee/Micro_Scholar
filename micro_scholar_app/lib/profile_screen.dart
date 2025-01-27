import 'package:flutter/material.dart';
import 'create_request_screen.dart';
import 'repositories/user_repository.dart';
import 'repositories/request_repository.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final UserRepository userRepository = UserRepository();
  final RequestRepository requestRepository = RequestRepository();
  Map<String, dynamic> user = {};
  List<dynamic> requests = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchUserAndRequests();
  }

  Future<void> fetchUserAndRequests() async {
    try {
      final userData = await userRepository.getUser('user_id'); // Replace with actual user ID
      final requestList = await requestRepository.fetchRequests();
      setState(() {
        user = userData;
        requests = requestList;
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: isLoading
            ? Center(child: CircularProgressIndicator())
            : SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [Colors.blueAccent, Colors.lightBlue],
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                          ),
                          borderRadius: BorderRadius.circular(30),
                        ),
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          children: [
                            CircleAvatar(
                              radius: 50,
                              backgroundImage: AssetImage('assets/profile.jpg'),
                            ),
                            SizedBox(height: 10),
                            Text(
                              user['name'],
                              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                              textAlign: TextAlign.center,
                            ),
                            Text(
                              'Joined 8 min ago',
                              style: TextStyle(fontSize: 14, color: Colors.white70),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: 20),
                      Text(
                        'My Requests',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                      ),
                      SizedBox(height: 10),
                      ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: requests.length,
                        itemBuilder: (context, index) {
                          final request = requests[index];
                          return Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: ListTile(
                              title: Text(request.title),
                              subtitle: Text('Status: ${request.status}'),
                              trailing: Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
                            ),
                          );
                        },
                      ),
                      SizedBox(height: 20),
                      FloatingActionButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => CreateRequestScreen()),
                          );
                        },
                        child: Icon(Icons.add, size: 30),
                        backgroundColor: Colors.blueAccent,
                        elevation: 5,
                      ),
                    ],
                  ),
                ),
              ),
      ),
    );
  }
}
