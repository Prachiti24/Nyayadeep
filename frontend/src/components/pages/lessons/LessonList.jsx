import { Link } from "react-router-dom";

const LessonList = () => {
  const lessons = [
    { id: 1, title: "Lesson 1: Introduction to the Constitution", path: "/lessons/lesson1" },
    { id: 2, title: "Lesson 2: The Preamble Explained", path: "/lessons/lesson2" },
    { id: 3, title: "Lesson 3: Fundamental Rights", path: "/lessons/lesson3" },
    { id: 4, title: "Lesson 4: Directive Principles", path: "/lessons/lesson4" },
    { id: 5, title: "Lesson 5: The Constitution and Gender Justice", path: "/lessons/lesson5" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-yellow-600 mb-6">Learn the Constitution</h1>
      <ul className="space-y-4">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="p-4 border rounded hover:bg-yellow-50">
            <Link to={lesson.path} className="text-xl font-semibold text-blue-600 hover:underline">
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;