import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';

part 'scholarship_event.dart';
part 'scholarship_state.dart';

class ScholarshipBloc extends Bloc<ScholarshipEvent, ScholarshipState> {
  ScholarshipBloc() : super(ScholarshipInitial()) {
    on<LoadScholarships>((event, emit) {
      // Load dummy data
      final scholarships = [
        {'id': 1, 'title': 'Scholarship A', 'amount': 1000, 'fundedAmount': 500},
        {'id': 2, 'title': 'Scholarship B', 'amount': 2000, 'fundedAmount': 1500},
      ];
      emit(ScholarshipsLoaded(scholarships));
    });
  }
}
