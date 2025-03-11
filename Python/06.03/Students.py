from typing import List, Dict

class Student:
    def __init__(self, student_id: int, first_name: str, last_name: str, age: int):
        self.id = student_id
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.courses = []

class Course:
    def __init__(self, student_id: int, course_name: str):
        self.student_id = student_id
        self.course_name = course_name

def load_students(file_path: str) -> Dict[int, Student]:
    students = {}
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            parts = line.strip().split(",")
            student_id, first_name, last_name, age = int(parts[0]), parts[1], parts[2], int(parts[3])
            students[student_id] = Student(student_id, first_name, last_name, age)
    return students

def load_courses(file_path: str, students: Dict[int, Student]):
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            student_id, course_name = line.strip().split(",")
            student_id = int(student_id)
            if student_id in students:
                students[student_id].courses.append(course_name)

def print_students(students: Dict[int, Student]):
    for student in students.values():
        courses_str = ", ".join(student.courses)
        print(f"{student.first_name} {student.last_name} ({student.age} lat): {courses_str}")

def save_student_courses(students: Dict[int, Student]):
    for student in students.values():
        file_name = f"{student.first_name.lower()}_{student.last_name.lower()}.txt"
        with open(file_name, "w", encoding="utf-8") as file:
            file.write("Kursy:\n")
            for course in student.courses:
                file.write(f"- {course}\n")


students = load_students("students.txt")
load_courses("courses.txt", students)
print_students(students)
save_student_courses(students)
