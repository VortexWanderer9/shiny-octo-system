import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
  createContext,
  useContext,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Circle,
  Sparkles,
  Plus,
  Trash2,
  RefreshCw,
  Sun,
  Moon,
} from "lucide-react";

function L(lines) {
  return lines.join("\n");
}

/* ---------------------------------------------------------------
   Small shared UI pieces
--------------------------------------------------------------- */

function DemoShell({ children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
      {children}
    </div>
  );
}

function CodeBlock({ lines }) {
  return (
    <pre className="rounded-xl border border-slate-800 bg-black/40 p-4 text-[13px] leading-6 text-emerald-200 overflow-x-auto font-mono">
      {lines.join("\n")}
    </pre>
  );
}

function Pill({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-800 text-slate-300",
    indigo: "bg-indigo-500/20 text-indigo-300",
    emerald: "bg-emerald-500/20 text-emerald-300",
  };
  return (
    <span className={"inline-block rounded-full px-2.5 py-1 text-xs font-mono " + tones[tone]}>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------
   1. Components & JSX
--------------------------------------------------------------- */

function Greeting({ name }) {
  return (
    <p className="text-slate-200">
      Hello, <span className="text-indigo-300 font-semibold">{name}</span>! This whole box is one component.
    </p>
  );
}

function ComponentsDemo() {
  return (
    <DemoShell>
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        <Greeting name="Elliot" />
      </div>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   2. Props
--------------------------------------------------------------- */

function ProfileCard({ name, role, color }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 flex items-center gap-3">
      <div className={"h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold " + color}>
        {name.charAt(0)}
      </div>
      <div>
        <div className="text-slate-100 text-sm font-medium">{name}</div>
        <div className="text-slate-400 text-xs">{role}</div>
      </div>
    </div>
  );
}

function PropsDemo() {
  const people = [
    { name: "Ava", role: "Backend engineer", color: "bg-indigo-500/30 text-indigo-200" },
    { name: "Sana", role: "Designer", color: "bg-emerald-500/30 text-emerald-200" },
    { name: "Priya", role: "Product manager", color: "bg-amber-500/30 text-amber-200" },
  ];
  return (
    <DemoShell>
      <div className="grid gap-3 sm:grid-cols-3">
        {people.map((p) => (
          <ProfileCard key={p.name} name={p.name} role={p.role} color={p.color} />
        ))}
      </div>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   3. State - useState
--------------------------------------------------------------- */

function StateDemo() {
  const [count, setCount] = useState(0);
  return (
    <DemoShell>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100"
        >
          −
        </button>
        <div className="text-2xl font-mono text-slate-100 w-12 text-center">{count}</div>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100"
        >
          +
        </button>
        <button
          onClick={() => setCount(0)}
          className="ml-2 px-3 py-2 rounded-lg text-sm bg-transparent border border-slate-700 text-slate-300 hover:border-indigo-400"
        >
          Reset
        </button>
      </div>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   4. Event Handling
--------------------------------------------------------------- */

function EventsDemo() {
  const [selected, setSelected] = useState("indigo");
  const [clicks, setClicks] = useState(0);
  const colors = ["indigo", "emerald", "amber", "rose"];
  const swatch = {
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
  };
  return (
    <DemoShell>
      <div className="flex items-center gap-3 mb-3">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => {
              setSelected(c);
              setClicks((n) => n + 1);
            }}
            className={
              "h-8 w-8 rounded-full " +
              swatch[c] +
              (selected === c ? " ring-2 ring-offset-2 ring-offset-slate-950 ring-white" : "")
            }
            aria-label={c}
          />
        ))}
      </div>
      <p className="text-sm text-slate-400">
        Selected: <span className="text-slate-200 font-mono">{selected}</span> — clicked {clicks} time(s)
      </p>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   5. Conditional Rendering
--------------------------------------------------------------- */

function ConditionalDemo() {
  const [status, setStatus] = useState("idle");
  return (
    <DemoShell>
      <div className="flex gap-2 mb-4">
        {["idle", "loading", "success", "error"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={
              "px-3 py-1.5 rounded-lg text-xs font-mono border " +
              (status === s
                ? "border-indigo-400 text-indigo-300 bg-indigo-500/10"
                : "border-slate-700 text-slate-400 hover:border-slate-500")
            }
          >
            {s}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 min-h-[52px] flex items-center">
        {status === "idle" && <p className="text-slate-400 text-sm">Nothing happening yet.</p>}
        {status === "loading" && <p className="text-amber-300 text-sm">Loading…</p>}
        {status === "success" && <p className="text-emerald-300 text-sm">Data loaded successfully.</p>}
        {status === "error" && <p className="text-rose-300 text-sm">Something went wrong.</p>}
      </div>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   6. Lists & Keys
--------------------------------------------------------------- */

function ListsDemo() {
  const [items, setItems] = useState([
    { id: 1, text: "Write the auth middleware" },
    { id: 2, text: "Review pull request" },
  ]);
  const [draft, setDraft] = useState("");
  const nextId = useRef(3);

  function addItem() {
    if (!draft.trim()) return;
    setItems((prev) => [...prev, { id: nextId.current++, text: draft.trim() }]);
    setDraft("");
  }

  return (
    <DemoShell>
      <div className="flex gap-2 mb-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add a task"
          className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
        />
        <button
          onClick={addItem}
          className="rounded-lg bg-indigo-500 hover:bg-indigo-400 px-3 py-2 text-slate-950"
        >
          <Plus size={16} />
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200"
          >
            {item.text}
            <button
              onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
              className="text-slate-500 hover:text-rose-400"
            >
              <Trash2 size={15} />
            </button>
          </li>
        ))}
      </ul>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   7. Forms & Controlled Inputs
--------------------------------------------------------------- */

function FormsDemo() {
  const [form, setForm] = useState({ name: "", plan: "starter", newsletter: false });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <DemoShell>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className="w-full mb-2 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
          />
          <select
            value={form.plan}
            onChange={(e) => update("plan", e.target.value)}
            className="w-full mb-2 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
          >
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="team">Team</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.newsletter}
              onChange={(e) => update("newsletter", e.target.checked)}
            />
            Subscribe to updates
          </label>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-xs font-mono text-slate-400">
          <div>name: <span className="text-slate-200">{form.name || "(empty)"}</span></div>
          <div>plan: <span className="text-slate-200">{form.plan}</span></div>
          <div>newsletter: <span className="text-slate-200">{String(form.newsletter)}</span></div>
        </div>
      </div>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   8. Lifting State Up
--------------------------------------------------------------- */

function toFahrenheit(c) {
  return c === "" ? "" : Math.round((Number(c) * 9) / 5 + 32);
}
function toCelsius(f) {
  return f === "" ? "" : Math.round(((Number(f) - 32) * 5) / 9);
}

function LiftingStateDemo() {
  const [celsius, setCelsius] = useState("22");

  return (
    <DemoShell>
      <div className="flex items-center gap-4">
        <label className="flex-1">
          <div className="text-xs text-slate-500 mb-1">Celsius</div>
          <input
            value={celsius}
            onChange={(e) => setCelsius(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
          />
        </label>
        <div className="text-slate-600 pt-5">=</div>
        <label className="flex-1">
          <div className="text-xs text-slate-500 mb-1">Fahrenheit</div>
          <input
            value={toFahrenheit(celsius)}
            onChange={(e) => setCelsius(String(toCelsius(e.target.value)))}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
          />
        </label>
      </div>
      <p className="text-xs text-slate-500 mt-3">
        Both inputs read from and write to one shared state value in the parent — that is the "lift".
      </p>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   9. useEffect & Side Effects
--------------------------------------------------------------- */

function EffectDemo() {
  const [on, setOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (!on) return;
    setLog((l) => [...l, "Effect started — interval created"]);
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      setLog((l) => [...l, "Cleanup ran — interval cleared"]);
      clearInterval(id);
    };
  }, [on]);

  return (
    <DemoShell>
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => {
            setOn((v) => !v);
            if (on) setSeconds(0);
          }}
          className={
            "px-3 py-2 rounded-lg text-sm font-mono " +
            (on ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300")
          }
        >
          {on ? "Stop timer" : "Start timer"}
        </button>
        <div className="text-slate-200 font-mono text-lg">{seconds}s</div>
      </div>
      <div className="rounded-lg border border-slate-800 bg-black/30 p-3 text-xs font-mono text-slate-500 h-20 overflow-y-auto">
        {log.length === 0 ? "Effect log will appear here." : log.map((line, i) => <div key={i}>{line}</div>)}
      </div>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   10. useRef
--------------------------------------------------------------- */

function RefDemo() {
  const inputRef = useRef(null);
  const renderCountRef = useRef(0);
  const [rerenderCount, setRerenderCount] = useState(0);
  renderCountRef.current += 1;

  return (
    <DemoShell>
      <div className="flex gap-2 mb-3">
        <input
          ref={inputRef}
          placeholder="Click the button to focus me"
          className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
        />
        <button
          onClick={() => inputRef.current && inputRef.current.focus()}
          className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2 text-sm text-slate-100"
        >
          Focus input
        </button>
      </div>
      <div className="flex gap-4 text-xs font-mono">
        <Pill tone="slate">ref renders seen: {renderCountRef.current} (no re-render caused)</Pill>
        <Pill tone="indigo">state re-renders: {rerenderCount}</Pill>
      </div>
      <button
        onClick={() => setRerenderCount((c) => c + 1)}
        className="mt-3 text-xs text-slate-400 underline hover:text-slate-200"
      >
        Trigger a state re-render
      </button>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   11. useMemo & useCallback
--------------------------------------------------------------- */

function expensiveFilter(items, query, counterRef) {
  counterRef.current += 1;
  let total = 0;
  for (let i = 0; i < 2000000; i++) total += i % 7; // simulate heavy work
  return items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));
}

function MemoDemo() {
  const items = ["React", "Redux", "Rust", "Ruby", "Reason", "Rescript"];
  const [query, setQuery] = useState("r");
  const [unrelated, setUnrelated] = useState(0);
  const computeCount = useRef(0);

  const filtered = useMemo(() => expensiveFilter(items, query, computeCount), [query]);

  const handleClear = useCallback(() => setQuery(""), []);

  return (
    <DemoShell>
      <div className="flex gap-2 mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
        />
        <button onClick={handleClear} className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100">
          Clear
        </button>
        <button
          onClick={() => setUnrelated((c) => c + 1)}
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300"
        >
          Unrelated state ({unrelated})
        </button>
      </div>
      <p className="text-sm text-slate-300 mb-2">{filtered.join(", ") || "no matches"}</p>
      <Pill tone="emerald">expensive filter recomputed {computeCount.current} time(s)</Pill>
      <p className="text-xs text-slate-500 mt-2">
        Clicking "Unrelated state" re-renders the component but useMemo skips recomputing since the query did not change.
      </p>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   12. useReducer
--------------------------------------------------------------- */

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "add":
      return { count: state.count + action.amount };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

function ReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <DemoShell>
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={() => dispatch({ type: "decrement" })} className="rounded-lg bg-slate-800 px-3 py-2 text-slate-100">
          −1
        </button>
        <div className="text-2xl font-mono text-slate-100 w-16 text-center">{state.count}</div>
        <button onClick={() => dispatch({ type: "increment" })} className="rounded-lg bg-slate-800 px-3 py-2 text-slate-100">
          +1
        </button>
        <button onClick={() => dispatch({ type: "add", amount: 10 })} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300">
          +10
        </button>
        <button onClick={() => dispatch({ type: "reset" })} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300">
          Reset
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-3">
        Every update goes through one reducer function, so all the state transition logic lives in one place.
      </p>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   13. Context (useContext)
--------------------------------------------------------------- */

const ThemeContext = createContext("dark");

function ThemedBox() {
  const theme = useContext(ThemeContext);
  const light = theme === "light";
  return (
    <div
      className={
        "rounded-lg border p-4 text-sm " +
        (light ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-slate-200")
      }
    >
      This box reads the theme via useContext — no props were passed down to it.
    </div>
  );
}

function ContextDemo() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={theme}>
      <DemoShell>
        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="mb-3 flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-indigo-400"
        >
          {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
          Toggle theme ({theme})
        </button>
        <ThemedBox />
      </DemoShell>
    </ThemeContext.Provider>
  );
}

/* ---------------------------------------------------------------
   14. Custom Hooks
--------------------------------------------------------------- */

function useCounter(initial) {
  const [count, setCount] = useState(initial);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  return { count, increment, decrement };
}

function CounterWidget({ label }) {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 flex items-center justify-between">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <button onClick={decrement} className="h-7 w-7 rounded bg-slate-800 text-slate-100">−</button>
        <span className="font-mono text-slate-100 w-6 text-center">{count}</span>
        <button onClick={increment} className="h-7 w-7 rounded bg-slate-800 text-slate-100">+</button>
      </div>
    </div>
  );
}

function CustomHookDemo() {
  return (
    <DemoShell>
      <div className="grid gap-3 sm:grid-cols-2">
        <CounterWidget label="Widget A" />
        <CounterWidget label="Widget B" />
      </div>
      <p className="text-xs text-slate-500 mt-3">
        Both widgets call the same useCounter hook but keep fully independent state.
      </p>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   15. Composition (children / slots)
--------------------------------------------------------------- */

function Panel({ title, children }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-800 text-xs font-mono text-slate-400">{title}</div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function CompositionDemo() {
  return (
    <DemoShell>
      <div className="grid gap-3 sm:grid-cols-2">
        <Panel title="panel-a">
          <p className="text-sm text-slate-300">Any JSX can be passed as children.</p>
        </Panel>
        <Panel title="panel-b">
          <button className="rounded bg-indigo-500/20 text-indigo-300 text-sm px-3 py-1.5">
            Even interactive elements
          </button>
        </Panel>
      </div>
      <p className="text-xs text-slate-500 mt-3">
        Panel does not know or care what it is wrapping — that is composition instead of configuration.
      </p>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   16. Error Boundaries
--------------------------------------------------------------- */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
          Something crashed in this part of the tree.
          <button
            onClick={() => this.setState({ hasError: false })}
            className="ml-3 underline hover:text-rose-100"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Buggy() {
  const [boom, setBoom] = useState(false);
  if (boom) {
    throw new Error("Deliberate crash for the demo");
  }
  return (
    <button
      onClick={() => setBoom(true)}
      className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2 text-sm text-slate-100"
    >
      Click to throw an error
    </button>
  );
}

function ErrorBoundaryDemo() {
  const [key, setKey] = useState(0);
  return (
    <DemoShell>
      <ErrorBoundary key={key}>
        <Buggy />
      </ErrorBoundary>
      <p className="text-xs text-slate-500 mt-3">
        Without a boundary, a thrown error here would unmount the whole application instead of just this panel.
      </p>
    </DemoShell>
  );
}

/* ---------------------------------------------------------------
   Lesson registry
--------------------------------------------------------------- */

const LESSONS = [
  {
    title: "Components & JSX",
    explain: "A component is just a function that returns JSX — HTML-like syntax that compiles down to JavaScript. Components are the reusable building blocks of a React application.",
    Demo: ComponentsDemo,
    code: L([
      'function Greeting({ name }) {',
      '  return <p>Hello, {name}!</p>;',
      '}',
    ]),
  },
  {
    title: "Props",
    explain: "Props are how a parent passes data down into a child component. They are read-only from the child's point of view — a component never modifies its own props.",
    Demo: PropsDemo,
    code: L([
      'function ProfileCard({ name, role }) {',
      '  return <div>{name} - {role}</div>;',
      '}',
      '',
      '<ProfileCard name="Ava" role="Engineer" />',
    ]),
  },
  {
    title: "State - useState",
    explain: "State is data that a component owns and can change over time. Calling the setter function schedules a re-render with the new value.",
    Demo: StateDemo,
    code: L([
      'const [count, setCount] = useState(0);',
      '',
      '<button onClick={() => setCount(c => c + 1)}>+</button>',
    ]),
  },
  {
    title: "Event Handling",
    explain: "React wraps native browser events in a consistent SyntheticEvent. Handlers are passed as functions to props like onClick and onChange.",
    Demo: EventsDemo,
    code: L([
      '<button onClick={() => setSelected("indigo")}>',
      '  indigo',
      '</button>',
    ]),
  },
  {
    title: "Conditional Rendering",
    explain: "JSX is just JavaScript, so you can use if statements, ternaries, or the && operator to decide what gets rendered.",
    Demo: ConditionalDemo,
    code: L([
      '{status === "loading" && <Spinner />}',
      '{status === "error" ? <ErrorMsg /> : <Content />}',
    ]),
  },
  {
    title: "Lists & Keys",
    explain: "Rendering a list with .map() requires a stable, unique key prop per item so React can track which items changed, were added, or removed.",
    Demo: ListsDemo,
    code: L([
      '{items.map(item => (',
      '  <li key={item.id}>{item.text}</li>',
      '))}',
    ]),
  },
  {
    title: "Forms & Controlled Inputs",
    explain: "A controlled input's value is driven entirely by React state, and every keystroke flows through an onChange handler that updates that state.",
    Demo: FormsDemo,
    code: L([
      '<input',
      '  value={form.name}',
      '  onChange={e => update("name", e.target.value)}',
      '/>',
    ]),
  },
  {
    title: "Lifting State Up",
    explain: "When two components need to share the same changing data, move that state up to their closest common parent and pass it down as props.",
    Demo: LiftingStateDemo,
    code: L([
      'const [celsius, setCelsius] = useState("22");',
      '// both inputs read and write "celsius" via the parent',
    ]),
  },
  {
    title: "useEffect & Side Effects",
    explain: "useEffect runs code after render for things React does not manage itself — timers, subscriptions, network calls. The returned function cleans up before the next run or on unmount.",
    Demo: EffectDemo,
    code: L([
      'useEffect(() => {',
      '  const id = setInterval(tick, 1000);',
      '  return () => clearInterval(id);',
      '}, [on]);',
    ]),
  },
  {
    title: "useRef",
    explain: "useRef holds a mutable value that persists across renders without causing a re-render when it changes. It is also the standard way to reach a real DOM node.",
    Demo: RefDemo,
    code: L([
      'const inputRef = useRef(null);',
      '<input ref={inputRef} />',
      'inputRef.current.focus();',
    ]),
  },
  {
    title: "useMemo & useCallback",
    explain: "useMemo caches the result of an expensive calculation between renders, recomputing only when its dependencies change. useCallback does the same for function references.",
    Demo: MemoDemo,
    code: L([
      'const filtered = useMemo(',
      '  () => expensiveFilter(items, query),',
      '  [query]',
      ');',
    ]),
  },
  {
    title: "useReducer",
    explain: "For state with several related transitions, useReducer centralizes the update logic into one pure function instead of scattering it across many setState calls.",
    Demo: ReducerDemo,
    code: L([
      'function reducer(state, action) {',
      '  switch (action.type) {',
      '    case "increment": return { count: state.count + 1 };',
      '    default: return state;',
      '  }',
      '}',
      'const [state, dispatch] = useReducer(reducer, { count: 0 });',
    ]),
  },
  {
    title: "Context (useContext)",
    explain: "Context lets a value be read by any descendant component without threading it through props at every level in between.",
    Demo: ContextDemo,
    code: L([
      'const ThemeContext = createContext("dark");',
      '',
      '<ThemeContext.Provider value={theme}>',
      '  <ThemedBox />',
      '</ThemeContext.Provider>',
    ]),
  },
  {
    title: "Custom Hooks",
    explain: "A custom hook is just a function whose name starts with use that calls other hooks inside it — a way to extract and reuse stateful logic between components.",
    Demo: CustomHookDemo,
    code: L([
      'function useCounter(initial) {',
      '  const [count, setCount] = useState(initial);',
      '  const increment = () => setCount(c => c + 1);',
      '  return { count, increment };',
      '}',
    ]),
  },
  {
    title: "Composition",
    explain: "Passing children into a component lets it stay generic about layout while remaining completely agnostic about the content it wraps.",
    Demo: CompositionDemo,
    code: L([
      'function Panel({ title, children }) {',
      '  return <div><h4>{title}</h4>{children}</div>;',
      '}',
      '',
      '<Panel title="panel-a"><p>Any JSX here</p></Panel>',
    ]),
  },
  {
    title: "Error Boundaries",
    explain: "An error boundary is a class component that catches errors thrown while rendering its children and shows a fallback UI instead of crashing the whole tree.",
    Demo: ErrorBoundaryDemo,
    code: L([
      'class ErrorBoundary extends React.Component {',
      '  static getDerivedStateFromError() {',
      '    return { hasError: true };',
      '  }',
      '  render() {',
      '    return this.state.hasError ? <Fallback /> : this.props.children;',
      '  }',
      '}',
    ]),
  },
];

/* ---------------------------------------------------------------
   App shell
--------------------------------------------------------------- */

export default function App() {
  const [index, setIndex] = useState(0);
  const [viewed, setViewed] = useState(() => new Set([0]));

  useEffect(() => {
    setViewed((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, [index]);

  const lesson = LESSONS[index];
  const progressPct = Math.round((viewed.size / LESSONS.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <aside className="w-64 shrink-0 border-r border-slate-800 flex flex-col h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-indigo-400" />
            <h1 className="font-semibold text-slate-100">React Concepts</h1>
          </div>
          <p className="text-xs text-slate-500">Sixteen live building blocks of a React app.</p>
        </div>
        <div className="px-5 py-3 border-b border-slate-800">
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: progressPct + "%" }}
            />
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1.5">
            {viewed.size} / {LESSONS.length} viewed
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {LESSONS.map((l, i) => (
            <button
              key={l.title}
              onClick={() => setIndex(i)}
              className={
                "w-full flex items-center gap-2.5 px-5 py-2 text-left text-sm border-l-2 " +
                (i === index
                  ? "border-indigo-400 bg-slate-900 text-slate-100"
                  : "border-transparent text-slate-400 hover:bg-slate-900/60 hover:text-slate-200")
              }
            >
              <span className="font-mono text-[11px] text-slate-600 w-5">{String(i + 1).padStart(2, "0")}</span>
              {viewed.has(i) ? (
                <Check size={13} className="text-indigo-400 shrink-0" />
              ) : (
                <Circle size={13} className="text-slate-700 shrink-0" />
              )}
              <span className="truncate">{l.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-10 py-12">
          <div className="text-xs font-mono text-indigo-400 mb-2">
            Lesson {index + 1} of {LESSONS.length}
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">{lesson.title}</h2>
          <p className="text-slate-400 leading-relaxed max-w-prose mb-8">{lesson.explain}</p>

          <div className="mb-6">
            <div className="text-xs font-mono text-slate-500 mb-2">live demo</div>
            <lesson.Demo />
          </div>

          <div>
            <div className="text-xs font-mono text-slate-500 mb-2">how it works</div>
            <CodeBlock lines={[lesson.code]} />
          </div>

          <div className="flex justify-between mt-12 pt-6 border-t border-slate-800">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="flex items-center gap-1 rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-300 disabled:opacity-30 hover:border-indigo-400 disabled:hover:border-slate-800"
            >
              <ChevronLeft size={15} /> Previous
            </button>
            <button
              onClick={() => setIndex((i) => Math.min(LESSONS.length - 1, i + 1))}
              disabled={index === LESSONS.length - 1}
              className="flex items-center gap-1 rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-300 disabled:opacity-30 hover:border-indigo-400 disabled:hover:border-slate-800"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
