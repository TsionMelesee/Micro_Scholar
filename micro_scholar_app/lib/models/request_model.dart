class Request {
  final String title;
  final String status;
  final int amount;
  final String description;

  Request({required this.title, required this.status, required this.amount, required this.description});

  factory Request.fromJson(Map<String, dynamic> json) {
    return Request(
      title: json['title'],
      status: json['status'],
      amount: json['amount'],
      description: json['description'],
    );
  }
}
