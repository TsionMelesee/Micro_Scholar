part of 'scholarship_bloc.dart';

abstract class ScholarshipState extends Equatable {
  const ScholarshipState();

  @override
  List<Object> get props => [];
}

class ScholarshipInitial extends ScholarshipState {}

class ScholarshipsLoaded extends ScholarshipState {
  final List<Map<String, dynamic>> scholarships;

  const ScholarshipsLoaded(this.scholarships);

  @override
  List<Object> get props => [scholarships];
}
