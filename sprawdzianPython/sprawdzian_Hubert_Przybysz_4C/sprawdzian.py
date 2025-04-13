import json
import os
import pkg_resources
from datetime import datetime
from sprawdzian_Hubert_Przybysz_4C.models.Student import Student
from sprawdzian_Hubert_Przybysz_4C.models.Teacher import Teacher
from sprawdzian_Hubert_Przybysz_4C.models.Subject import Subject
from sprawdzian_Hubert_Przybysz_4C.models.Grades import Grades
from sprawdzian_Hubert_Przybysz_4C.year_grade import year_grade

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Hubert Przybysz 4C"


def get_data_path(filename):
    return pkg_resources.resource_filename(
        'sprawdzian_Hubert_Przybysz_4C',
        f'data/{filename}'
    )


def main():
    teachers = []
    subjects = []
    students = []
    grades_list = []

    with open(get_data_path('teachers.txt'), 'r') as f:
        for line in f:
            parts = line.strip().split()
            _id = int(parts[0])
            name = parts[1]
            surname = ' '.join(parts[2:])
            teachers.append(Teacher(_id, name, surname))

    with open(get_data_path('subjects.txt'), 'r') as f:
        for line in f:
            parts = line.strip().split()
            _id = int(parts[0])
            name = ' '.join(parts[1:-1])
            teacher_id = int(parts[-1])
            teacher = next((t for t in teachers if t._id == teacher_id), None)
            if teacher:
                subjects.append(Subject(_id, name, teacher))

    with open(get_data_path('students.txt'), 'r') as f:
        for line in f:
            parts = line.strip().split()
            _id = int(parts[0])
            first_name = parts[1]
            last_name = ' '.join(parts[2:-1])
            birth_date = datetime.strptime(parts[-1], '%Y-%m-%d').date()
            students.append(Student(_id, first_name, last_name, birth_date))

    with open(get_data_path('grades.txt'), 'r') as f:
        for line in f:
            parts = line.strip().split()
            student_id = int(parts[0])
            subject_id = int(parts[1])
            grades_str = parts[2].split(',')

            student = next((s for s in students if s._id == student_id), None)
            subject = next((sub for sub in subjects if sub._id == subject_id), None)

            if student and subject:
                grades = Grades(student, subject)
                for grade_str in grades_str:
                    grade = int(grade_str)
                    grades.add_grade(grade)
                grades_list.append(grades)

    print("Oceny i średnie poszczególnych uczniów.")
    print()

    students_data = {}
    for student in students:
        student_grades = [g for g in grades_list if g.student._id == student._id]
        if not student_grades:
            continue

        print(student)
        students_data[str(student)] = {}

        for grade_obj in student_grades:
            subject_name = grade_obj.subject.name
            grades = grade_obj.get_grades()
            average = grade_obj.get_average()
            final_grade = year_grade(average)

            print(f"{subject_name}:")
            print(f"Oceny: {', '.join(map(str, grades))}")
            print(f"Średnia: {average:.2f}")
            print(f"Ocena końcowa: {final_grade}")
            print()

            students_data[str(student)][subject_name] = {
                "Oceny": ", ".join(map(str, grades)),
                "Srednia": round(average, 2),
                "Ocena roczna": final_grade
            }
        print()

    with open('students.json', 'w') as f:
        json.dump([students_data], f, indent=4)

    print("=" * 50)
    print()

    subjects_data = []
    for subject in subjects:
        subject_grades = [g for g in grades_list if g.subject._id == subject._id]
        if not subject_grades:
            continue

        all_grades = []
        for grade_obj in subject_grades:
            all_grades.extend(grade_obj.get_grades())

        average = sum(all_grades) / len(all_grades) if all_grades else 0

        print(f"{subject.name}:")
        print(f"Nauczyciel: {subject.teacher}")
        print(f"Oceny: {', '.join(map(str, all_grades))}")
        print(f"Średnia: {average:.2f}")
        print()

        subjects_data.append({
            subject.name: {
                "Nauczyciel": str(subject.teacher),
                "Oceny": all_grades,
                "Srednia": round(average, 2)
            }
        })

    with open('subjects.json', 'w') as f:
        json.dump(subjects_data, f, indent=4)


if __name__ == "__main__":
    main()