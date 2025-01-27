part of 'scholarship_bloc.dart';

abstract class ScholarshipEvent extends Equatable {
  const ScholarshipEvent();

  @override
  List<Object> get props => [];
}

class LoadScholarships extends ScholarshipEvent {}
