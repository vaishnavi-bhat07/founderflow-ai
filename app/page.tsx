
"use client";

import { useState } from "react";

const menu = ["Dashboard", "Task Planner", "AI Assistant", "Goal Tracker", "Idea Vault"];

export default function Home() {
  const [active, setActive] = useState("Dashboard");
  const [tasks, setTasks] = useState([
    { name: "Complete market research", done: false },
    { name: "Design startup website", done: true },
    { name: "Prepare pitch deck", done: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [ideas, setIdeas] = useState(["AI Customer Feedback Analyser", "Startup Expense Tracker"]);
  const [newIdea, setNewIdea] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Hello Founder! Ask me to help organise your startup work.");

  function addTask() {
    if (!newTask.trim()) return;
    setTasks([...tasks, { name: newTask, done: false }]);
    setNewTask("");
  }

  function addIdea() {
    if (!newIdea.trim()) return;
    setIdeas([...ideas, newIdea]);
    setNewIdea("");
  }

  function askAI() {
    if (!question.trim()) return;
    setAnswer(
      "Here is your suggested plan:\n\n1. Define your main objective.\n2. Break it into smaller tasks.\n3. Prioritise the most important task.\n4. Set a deadline.\n5. Review your progress daily.\n\nThis is a simulated demo response, not a live AI service."
    );
    setQuestion("");
  }

  const completed = tasks.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 md:flex">

      <aside className="bg-indigo-950 text-white p-6 md:w-64">
        <h1 className="text-2xl font-bold">FounderFlow AI</h1>
        <p className="text-indigo-300 text-sm mt-2">
          Plan smarter. Build faster.
        </p>

        <nav className="mt-10 space-y-3">
          {menu.map(item => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left p-3 rounded-lg ${
                active === item ? "bg-indigo-700" : "hover:bg-indigo-900"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <p className="text-xs text-indigo-300 mt-12">
          Your startup workspace
        </p>
      </aside>

      <main className="flex-1 p-5 md:p-10">

        <header className="flex justify-between items-center mb-10">
          <div>
            <p className="text-sm text-slate-500">MY WORKSPACE</p>
            <h2 className="text-xl font-bold">FounderFlow AI</h2>
          </div>
          <div className="bg-indigo-100 text-indigo-800 rounded-full p-3 font-bold">
            VB
          </div>
        </header>

        {active === "Dashboard" && (
          <>
            <h1 className="text-3xl font-bold">Welcome, Founder! 👋</h1>
            <p className="text-slate-500 mt-2">
              Manage your startup journey from one place.
            </p>

            <div className="grid md:grid-cols-3 gap-5 mt-8">
              <Stat title="Total Tasks" value={tasks.length} />
              <Stat title="Completed Tasks" value={completed} />
              <Stat title="Saved Ideas" value={ideas.length} />
            </div>

            <section className="bg-white rounded-2xl p-6 mt-8 shadow-sm">
              <h2 className="text-xl font-bold mb-5">Recent Tasks</h2>
              {tasks.slice(0, 4).map((task, i) => (
                <p key={i} className="border-b py-3">
                  {task.done ? "✅" : "◯"} {task.name}
                </p>
              ))}
              <button
                onClick={() => setActive("Task Planner")}
                className="text-indigo-600 mt-4 font-semibold"
              >
                Manage Tasks →
              </button>
            </section>

            <section className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
              <h2 className="font-bold text-xl">Startup Goal</h2>
              <p className="mt-3">Launch our first MVP</p>
              <div className="bg-slate-200 h-3 rounded-full mt-4">
                <div className="bg-indigo-600 w-2/3 h-3 rounded-full" />
              </div>
              <p className="text-sm text-slate-500 mt-2">65% completed</p>
            </section>
          </>
        )}

        {active === "Task Planner" && (
          <>
            <PageHeading title="Task Planner" subtitle="Organise your work and stay productive." />
            <div className="bg-white p-6 rounded-2xl shadow-sm mt-6">
              <div className="flex flex-wrap gap-3">
                <input
                  className="border rounded-lg p-3 flex-1 min-w-0"
                  placeholder="Enter a new task..."
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addTask()}
                />
                <button onClick={addTask} className="bg-indigo-600 text-white px-5 py-3 rounded-lg">
                  + Add Task
                </button>
              </div>

              {tasks.map((task, i) => (
                <div key={i} className="flex gap-3 items-center border-b py-4">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => setTasks(tasks.map((t, index) =>
                      index === i ? { ...t, done: !t.done } : t
                    ))}
                  />
                  <span className={task.done ? "line-through text-slate-400" : ""}>
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {active === "AI Assistant" && (
          <>
            <PageHeading title="AI Productivity Assistant" subtitle="Get help planning your startup work." />
            <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
              <div className="bg-indigo-50 rounded-xl p-5 whitespace-pre-line">
                {answer}
              </div>
              <input
                className="border rounded-lg p-3 w-full mt-5"
                placeholder="Ask your productivity assistant..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === "Enter" && askAI()}
              />
              <button onClick={askAI} className="bg-indigo-600 text-white p-3 rounded-lg mt-3">
                Send Message →
              </button>
              <p className="text-xs text-slate-400 mt-3">
                Demo assistant with simulated responses.
              </p>
            </div>
          </>
        )}

        {active === "Goal Tracker" && (
          <>
            <PageHeading title="Goal Tracker" subtitle="Track your startup milestones." />
            {[
              { name: "Launch our first MVP", progress: 65 },
              { name: "Reach our first 100 users", progress: 30 },
              { name: "Complete market research", progress: 80 },
            ].map(goal => (
              <div key={goal.name} className="bg-white p-6 rounded-2xl mt-5 shadow-sm">
                <h2 className="font-bold">{goal.name}</h2>
                <div className="bg-slate-200 h-3 rounded-full mt-4">
                  <div
                    className="bg-indigo-600 h-3 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <p className="text-indigo-600 mt-2 text-sm">{goal.progress}% completed</p>
              </div>
            ))}
          </>
        )}

        {active === "Idea Vault" && (
          <>
            <PageHeading title="Idea Vault" subtitle="Save and organise your startup ideas." />
            <div className="bg-white p-6 rounded-2xl mt-6 shadow-sm">
              <input
                className="border rounded-lg p-3 w-full"
                placeholder="Enter your new idea..."
                value={newIdea}
                onChange={e => setNewIdea(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addIdea()}
              />
              <button onClick={addIdea} className="bg-indigo-600 text-white p-3 rounded-lg mt-3">
                + Save Idea
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              {ideas.map((idea, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                  <h2 className="font-bold">💡 {idea}</h2>
                  <p className="text-slate-500 text-sm mt-3">Saved startup idea</p>
                </div>
              ))}
            </div>
          </>
        )}

        <footer className="text-center text-slate-400 text-sm mt-12">
          © 2026 FounderFlow AI · Startup Productivity Workspace
        </footer>
      </main>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <p className="text-slate-500">{title}</p>
      <h2 className="text-3xl font-bold text-indigo-700 mt-3">{value}</h2>
    </div>
  );
}

function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-slate-500 mt-2">{subtitle}</p>
    </div>
  );
}
